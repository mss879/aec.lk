"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import type {
  ActivityType,
  LeadPriority,
  LeadStatus,
} from "@/lib/supabase/database.types";
import {
  CURRENCY_OPTIONS,
  DEFAULT_STAGE_COLOR,
  NOTE_TYPE_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  isHexColor,
  positionForNewCard,
  type ActionResult,
  type CrmFormState,
  type LeadActivityFeed,
} from "./board-utils";

const CRM_PATH = "/admin/crm";

/* -------------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------------- */

type Postgrestish = { code?: string; message?: string };

/**
 * Turns a Postgres error into something an admin can act on.
 *
 * The CRM migration guards the locked "New Leads" stage with triggers that
 * `raise exception ... using errcode = 'check_violation'` (SQLSTATE 23514) and
 * a human-readable message. Surfacing that message beats letting the action
 * throw and rendering a 500.
 */
function readableError(error: Postgrestish | null, fallback: string): string {
  if (!error) return fallback;
  if (error.code === "23514" && error.message) return error.message;
  if (error.code === "23505") {
    return "That record already exists in the pipeline.";
  }
  if (error.code === "23503") {
    return "Something that record points at has gone. Reload the board and try again.";
  }
  return error.message || fallback;
}

function fail(message: string): CrmFormState {
  return { status: "error", message, token: Date.now() };
}

function succeed(message: string): CrmFormState {
  return { status: "success", message, token: Date.now() };
}

function text(formData: FormData, key: string): string {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

function optionalText(formData: FormData, key: string): string | null {
  const value = text(formData, key);
  return value.length > 0 ? value : null;
}

/** Deliberately loose — enough to catch typos, not to police valid addresses. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type ParsedValue = { ok: true; value: number | null } | { ok: false };

function parseMoney(raw: string): ParsedValue {
  if (raw.length === 0) return { ok: true, value: null };

  const cleaned = raw.replace(/[\s,]/g, "");
  const parsed = Number(cleaned);

  if (!Number.isFinite(parsed) || parsed < 0) return { ok: false };
  // numeric(12, 2) — anything larger will not fit in the column.
  if (parsed > 9_999_999_999) return { ok: false };

  return { ok: true, value: Math.round(parsed * 100) / 100 };
}

function parsePriority(raw: string): LeadPriority {
  return (PRIORITY_OPTIONS as string[]).includes(raw)
    ? (raw as LeadPriority)
    : "medium";
}

function parseStatus(raw: string): LeadStatus {
  return (STATUS_OPTIONS as string[]).includes(raw)
    ? (raw as LeadStatus)
    : "open";
}

function parseCurrency(raw: string): string {
  const upper = raw.toUpperCase();
  return (CURRENCY_OPTIONS as readonly string[]).includes(upper) ? upper : "AUD";
}

function parseNoteType(raw: string): ActivityType {
  return (NOTE_TYPE_OPTIONS as string[]).includes(raw)
    ? (raw as ActivityType)
    : "note";
}

/* -------------------------------------------------------------------------
 * Leads
 * ---------------------------------------------------------------------- */

export async function createLeadAction(
  _prevState: CrmFormState,
  formData: FormData
): Promise<CrmFormState> {
  const admin = await requireAdmin();

  const fullName = text(formData, "full_name");
  if (!fullName) return fail("Enter the lead's full name.");

  const stageId = text(formData, "stage_id");
  if (!stageId) return fail("Pick a stage for this lead.");

  const email = text(formData, "email");
  if (email && !looksLikeEmail(email)) {
    return fail("That email address does not look right.");
  }

  const money = parseMoney(text(formData, "value"));
  if (!money.ok) return fail("Enter the deal value as a plain number.");

  const supabase = await createClient();

  // New cards go to the top of their column, matching promote_inquiry_to_lead().
  const { data: top } = await supabase
    .from("leads")
    .select("position")
    .eq("stage_id", stageId)
    .order("position", { ascending: true })
    .limit(1)
    .maybeSingle();

  const { data: lead, error } = await supabase
    .from("leads")
    .insert({
      stage_id: stageId,
      full_name: fullName,
      email: email || null,
      phone: optionalText(formData, "phone"),
      interest: optionalText(formData, "interest"),
      notes: optionalText(formData, "notes"),
      value: money.value,
      currency: parseCurrency(text(formData, "currency")),
      priority: parsePriority(text(formData, "priority")),
      source_type: "manual",
      position: positionForNewCard(top?.position ?? null),
    })
    .select("id")
    .single();

  if (error || !lead) {
    return fail(readableError(error, "Could not create that lead."));
  }

  await supabase.from("lead_activities").insert({
    lead_id: lead.id,
    type: "created",
    body: `Added to the pipeline by ${admin.full_name ?? admin.email}.`,
    created_by: admin.id,
  });

  revalidatePath(CRM_PATH);
  return succeed(`${fullName} added to the pipeline.`);
}

export async function updateLeadAction(
  _prevState: CrmFormState,
  formData: FormData
): Promise<CrmFormState> {
  const admin = await requireAdmin();

  const leadId = text(formData, "lead_id");
  if (!leadId) return fail("Missing lead reference.");

  const fullName = text(formData, "full_name");
  if (!fullName) return fail("Enter the lead's full name.");

  const stageId = text(formData, "stage_id");
  if (!stageId) return fail("Pick a stage for this lead.");

  const email = text(formData, "email");
  if (email && !looksLikeEmail(email)) {
    return fail("That email address does not look right.");
  }

  const money = parseMoney(text(formData, "value"));
  if (!money.ok) return fail("Enter the deal value as a plain number.");

  const supabase = await createClient();

  const { data: current, error: readError } = await supabase
    .from("leads")
    .select("id, stage_id, position")
    .eq("id", leadId)
    .maybeSingle();

  if (readError) return fail(readableError(readError, "Could not load that lead."));
  if (!current) return fail("That lead no longer exists.");

  const stageChanged = current.stage_id !== stageId;

  // Changing stage from the drawer drops the card at the top of its new column,
  // which is the only sane default when there is no drop point to interpolate.
  let position = current.position;
  if (stageChanged) {
    const { data: top } = await supabase
      .from("leads")
      .select("position")
      .eq("stage_id", stageId)
      .order("position", { ascending: true })
      .limit(1)
      .maybeSingle();
    position = positionForNewCard(top?.position ?? null);
  }

  const { error } = await supabase
    .from("leads")
    .update({
      stage_id: stageId,
      position,
      full_name: fullName,
      email: email || null,
      phone: optionalText(formData, "phone"),
      interest: optionalText(formData, "interest"),
      notes: optionalText(formData, "notes"),
      value: money.value,
      currency: parseCurrency(text(formData, "currency")),
      priority: parsePriority(text(formData, "priority")),
      status: parseStatus(text(formData, "status")),
    })
    .eq("id", leadId);

  if (error) return fail(readableError(error, "Could not save that lead."));

  if (stageChanged) {
    await recordStageChange(supabase, {
      leadId,
      fromStageId: current.stage_id,
      toStageId: stageId,
      adminId: admin.id,
    });
  }

  revalidatePath(CRM_PATH);
  return succeed("Lead saved.");
}

/**
 * Persists a drag.
 *
 * `position` is the midpoint the board computed from the card's new
 * neighbours — see the gap scheme in `board-utils.ts`. Only this one row is
 * written; the rest of the column keeps the positions it already had.
 */
export async function moveLeadAction(
  leadId: string,
  stageId: string,
  position: number
): Promise<ActionResult> {
  const admin = await requireAdmin();

  if (typeof leadId !== "string" || typeof stageId !== "string") {
    return { ok: false, error: "Missing lead or stage." };
  }
  if (!leadId || !stageId) return { ok: false, error: "Missing lead or stage." };
  if (typeof position !== "number" || !Number.isFinite(position)) {
    return { ok: false, error: "That drop position was not valid." };
  }

  const supabase = await createClient();

  const { data: current, error: readError } = await supabase
    .from("leads")
    .select("id, stage_id")
    .eq("id", leadId)
    .maybeSingle();

  if (readError) {
    return { ok: false, error: readableError(readError, "Could not move that lead.") };
  }
  if (!current) return { ok: false, error: "That lead no longer exists." };

  const { error } = await supabase
    .from("leads")
    .update({ stage_id: stageId, position })
    .eq("id", leadId);

  if (error) {
    return { ok: false, error: readableError(error, "Could not move that lead.") };
  }

  if (current.stage_id !== stageId) {
    await recordStageChange(supabase, {
      leadId,
      fromStageId: current.stage_id,
      toStageId: stageId,
      adminId: admin.id,
    });
  }

  revalidatePath(CRM_PATH);
  return { ok: true };
}

export async function deleteLeadAction(leadId: string): Promise<ActionResult> {
  await requireAdmin();

  if (typeof leadId !== "string" || !leadId) {
    return { ok: false, error: "Missing lead reference." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", leadId);

  if (error) {
    return { ok: false, error: readableError(error, "Could not delete that lead.") };
  }

  revalidatePath(CRM_PATH);
  return { ok: true };
}

export async function addLeadNoteAction(
  _prevState: CrmFormState,
  formData: FormData
): Promise<CrmFormState> {
  const admin = await requireAdmin();

  const leadId = text(formData, "lead_id");
  if (!leadId) return fail("Missing lead reference.");

  const body = text(formData, "body");
  if (!body) return fail("Write something before saving.");
  if (body.length > 4000) return fail("That note is too long (4000 characters max).");

  const supabase = await createClient();

  const { error } = await supabase.from("lead_activities").insert({
    lead_id: leadId,
    type: parseNoteType(text(formData, "type")),
    body,
    created_by: admin.id,
  });

  if (error) return fail(readableError(error, "Could not save that note."));

  revalidatePath(CRM_PATH);
  return succeed("Note added.");
}

/**
 * Timeline for one lead, newest first.
 *
 * Fetched on demand when the detail drawer opens rather than shipped with the
 * board — most sessions never open most cards.
 */
export async function getLeadActivitiesAction(
  leadId: string
): Promise<
  { ok: true; feed: LeadActivityFeed } | { ok: false; error: string }
> {
  await requireAdmin();

  if (typeof leadId !== "string" || !leadId) {
    return { ok: false, error: "Missing lead reference." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lead_activities")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    return { ok: false, error: readableError(error, "Could not load the timeline.") };
  }

  const activities = data ?? [];
  const authorIds = [
    ...new Set(
      activities
        .map((activity) => activity.created_by)
        .filter((id): id is string => Boolean(id))
    ),
  ];

  const authors: Record<string, string> = {};
  if (authorIds.length > 0) {
    const { data: admins } = await supabase
      .from("admin_users")
      .select("id, full_name, email")
      .in("id", authorIds);

    for (const admin of admins ?? []) {
      authors[admin.id] = admin.full_name ?? admin.email;
    }
  }

  return { ok: true, feed: { activities, authors } };
}

/* -------------------------------------------------------------------------
 * Pipeline stages
 * ---------------------------------------------------------------------- */

export async function createStageAction(
  _prevState: CrmFormState,
  formData: FormData
): Promise<CrmFormState> {
  await requireAdmin();

  const name = text(formData, "name");
  if (!name) return fail("Give the stage a name.");
  if (name.length > 60) return fail("Keep the stage name under 60 characters.");

  const colorInput = text(formData, "color");
  const color = isHexColor(colorInput) ? colorInput : DEFAULT_STAGE_COLOR;

  const supabase = await createClient();

  // New columns land on the right-hand end of the board.
  const { data: last } = await supabase
    .from("pipeline_stages")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("pipeline_stages").insert({
    name,
    description: optionalText(formData, "description"),
    color,
    position: (last?.position ?? -1) + 1,
    is_default: false,
  });

  if (error) return fail(readableError(error, "Could not create that stage."));

  revalidatePath(CRM_PATH);
  return succeed(`"${name}" added to the board.`);
}

export async function updateStageAction(
  _prevState: CrmFormState,
  formData: FormData
): Promise<CrmFormState> {
  await requireAdmin();

  const stageId = text(formData, "stage_id");
  if (!stageId) return fail("Missing stage reference.");

  const supabase = await createClient();

  const { data: stage, error: readError } = await supabase
    .from("pipeline_stages")
    .select("id, name, is_default")
    .eq("id", stageId)
    .maybeSingle();

  if (readError) return fail(readableError(readError, "Could not load that stage."));
  if (!stage) return fail("That stage no longer exists.");

  const submittedName = text(formData, "name");
  const colorInput = text(formData, "color");

  const patch: {
    name?: string;
    description: string | null;
    color?: string;
  } = { description: optionalText(formData, "description") };

  if (isHexColor(colorInput)) patch.color = colorInput;

  if (stage.is_default) {
    // The UI never offers the name field for the locked stage, but a Server
    // Action is reachable by direct POST — refuse here rather than letting the
    // database trigger turn it into a 500.
    if (submittedName && submittedName !== stage.name) {
      return fail(
        'The default "New Leads" stage cannot be renamed — it is where every promoted inquiry lands.'
      );
    }
  } else {
    if (!submittedName) return fail("Give the stage a name.");
    if (submittedName.length > 60) {
      return fail("Keep the stage name under 60 characters.");
    }
    patch.name = submittedName;
  }

  const { error } = await supabase
    .from("pipeline_stages")
    .update(patch)
    .eq("id", stageId);

  if (error) return fail(readableError(error, "Could not save that stage."));

  revalidatePath(CRM_PATH);
  return succeed("Stage saved.");
}

/** Writes `position` for every stage, in the order the ids arrive. */
export async function reorderStagesAction(
  orderedStageIds: string[]
): Promise<ActionResult> {
  await requireAdmin();

  if (
    !Array.isArray(orderedStageIds) ||
    orderedStageIds.length === 0 ||
    orderedStageIds.some((id) => typeof id !== "string" || !id)
  ) {
    return { ok: false, error: "That stage order was not valid." };
  }

  const supabase = await createClient();

  const results = await Promise.all(
    orderedStageIds.map((stageId, index) =>
      supabase.from("pipeline_stages").update({ position: index }).eq("id", stageId)
    )
  );

  const failed = results.find((result) => result.error);
  if (failed?.error) {
    return {
      ok: false,
      error: readableError(failed.error, "Could not reorder the stages."),
    };
  }

  revalidatePath(CRM_PATH);
  return { ok: true };
}

/**
 * Deletes a stage. Its leads are NOT deleted — a `before delete` trigger
 * re-homes them into the default stage first.
 */
export async function deleteStageAction(
  stageId: string
): Promise<ActionResult> {
  await requireAdmin();

  if (typeof stageId !== "string" || !stageId) {
    return { ok: false, error: "Missing stage reference." };
  }

  const supabase = await createClient();

  const { data: stage } = await supabase
    .from("pipeline_stages")
    .select("id, is_default")
    .eq("id", stageId)
    .maybeSingle();

  if (!stage) return { ok: false, error: "That stage no longer exists." };
  if (stage.is_default) {
    return {
      ok: false,
      error:
        'The default "New Leads" stage cannot be deleted — it is where every promoted inquiry lands.',
    };
  }

  const { error } = await supabase
    .from("pipeline_stages")
    .delete()
    .eq("id", stageId);

  if (error) {
    return { ok: false, error: readableError(error, "Could not delete that stage.") };
  }

  revalidatePath(CRM_PATH);
  return { ok: true };
}

/* -------------------------------------------------------------------------
 * Internals
 * ---------------------------------------------------------------------- */

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/** Every stage change leaves a trace in the lead's timeline. */
async function recordStageChange(
  supabase: SupabaseServerClient,
  {
    leadId,
    fromStageId,
    toStageId,
    adminId,
  }: {
    leadId: string;
    fromStageId: string;
    toStageId: string;
    adminId: string;
  }
): Promise<void> {
  const { data: stages } = await supabase
    .from("pipeline_stages")
    .select("id, name")
    .in("id", [fromStageId, toStageId]);

  const nameOf = (id: string) =>
    stages?.find((stage) => stage.id === id)?.name ?? "a removed stage";

  await supabase.from("lead_activities").insert({
    lead_id: leadId,
    type: "stage_change",
    body: `Moved from ${nameOf(fromStageId)} to ${nameOf(toStageId)}.`,
    created_by: adminId,
  });
}
