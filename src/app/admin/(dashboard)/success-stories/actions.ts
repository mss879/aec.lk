"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { deleteImage } from "@/lib/storage";
import { slugify } from "@/lib/blog";

/**
 * Server Actions for the Visa Grant Success Stories back office.
 *
 * Every export starts with `await requireAdmin()` — Server Actions are plain
 * POST endpoints, so the UI never being reachable is not a defence.
 *
 * Publishing without recorded consent is rejected by a database trigger as well
 * as here; this layer exists to turn that into a readable message rather than a
 * 500.
 */

const ADMIN_PATH = "/admin/success-stories";
const PUBLIC_PATH = "/success-stories";

export type GrantFieldError =
  | "student_name"
  | "slug"
  | "visa_subclass"
  | "story"
  | "processing_days"
  | "consent_on_file";

export type GrantFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<GrantFieldError, string>>;
};

/** Postgres unique_violation — the `visa_grants.slug` index. */
const UNIQUE_VIOLATION = "23505";

type GrantPayload = {
  student_name: string;
  slug: string;
  nationality: string | null;
  visa_subclass: string;
  visa_label: string | null;
  course: string | null;
  institution: string | null;
  destination_country: string;
  grant_date: string | null;
  processing_days: number | null;
  summary: string | null;
  story: string;
  consultant_name: string | null;
  photo_url: string | null;
  photo_path: string | null;
  consent_on_file: boolean;
  is_published: boolean;
  is_featured: boolean;
  position: number;
  seo_title: string | null;
  seo_description: string | null;
};

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalText(formData: FormData, key: string): string | null {
  const value = text(formData, key);
  return value.length ? value : null;
}

function checked(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

function readGrant(
  formData: FormData
): { ok: true; payload: GrantPayload } | { ok: false; state: GrantFormState } {
  const fieldErrors: Partial<Record<GrantFieldError, string>> = {};

  const studentName = text(formData, "student_name");
  if (!studentName) {
    fieldErrors.student_name = "Give the student a display name.";
  } else if (studentName.length > 120) {
    fieldErrors.student_name = "Keep the name under 120 characters.";
  }

  const slug = slugify(text(formData, "slug") || studentName);
  if (!slug) {
    fieldErrors.slug =
      "Enter a slug, or a name with letters or numbers to build one from.";
  }

  const visaSubclass = text(formData, "visa_subclass");
  if (!visaSubclass) {
    fieldErrors.visa_subclass = "Which visa was granted?";
  }

  const story = text(formData, "story");
  if (!story) fieldErrors.story = "Write the story.";

  const processingRaw = text(formData, "processing_days");
  let processingDays: number | null = null;
  if (processingRaw) {
    const parsed = Number.parseInt(processingRaw, 10);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 3650) {
      fieldErrors.processing_days = "Use a whole number of days (0–3650).";
    } else {
      processingDays = parsed;
    }
  }

  const positionRaw = text(formData, "position");
  const position = positionRaw === "" ? 0 : Number.parseInt(positionRaw, 10);

  const consent = checked(formData, "consent_on_file");
  const isPublished = checked(formData, "is_published");

  // This is a real person's immigration outcome. The database enforces the same
  // rule, but catching it here gives the editor a field-level message instead of
  // a raw Postgres exception.
  if (isPublished && !consent) {
    fieldErrors.consent_on_file =
      "You cannot publish a named student's story without recording their consent.";
  }

  if (Object.keys(fieldErrors).length) {
    return {
      ok: false,
      state: {
        status: "error",
        message: "Please fix the highlighted fields.",
        fieldErrors,
      },
    };
  }

  return {
    ok: true,
    payload: {
      student_name: studentName,
      slug,
      nationality: optionalText(formData, "nationality"),
      visa_subclass: visaSubclass,
      visa_label: optionalText(formData, "visa_label"),
      course: optionalText(formData, "course"),
      institution: optionalText(formData, "institution"),
      destination_country: text(formData, "destination_country") || "Australia",
      grant_date: optionalText(formData, "grant_date"),
      processing_days: processingDays,
      summary: optionalText(formData, "summary"),
      story,
      consultant_name: optionalText(formData, "consultant_name"),
      photo_url: optionalText(formData, "photo_url"),
      photo_path: optionalText(formData, "photo_path"),
      consent_on_file: consent,
      is_published: isPublished,
      is_featured: checked(formData, "is_featured"),
      position: Number.isInteger(position) ? position : 0,
      seo_title: optionalText(formData, "seo_title"),
      seo_description: optionalText(formData, "seo_description"),
    },
  };
}

function revalidateGrants(slug?: string) {
  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
  if (slug) revalidatePath(`${PUBLIC_PATH}/${slug}`);
}

/** Turns the consent trigger's exception into something an editor can act on. */
function friendlyError(message: string): string {
  return message.includes("consent_on_file")
    ? "That story cannot be published until consent is recorded."
    : message;
}

export async function createGrantAction(
  _prev: GrantFormState,
  formData: FormData
): Promise<GrantFormState> {
  await requireAdmin();

  const parsed = readGrant(formData);
  if (!parsed.ok) return parsed.state;

  const supabase = await createClient();
  const { error } = await supabase.from("visa_grants").insert(parsed.payload);

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      return {
        status: "error",
        message: "That slug is already in use.",
        fieldErrors: { slug: "Pick a different slug." },
      };
    }
    return { status: "error", message: friendlyError(error.message) };
  }

  revalidateGrants(parsed.payload.slug);
  // `redirect` throws, so it must sit outside any try/catch.
  redirect(ADMIN_PATH);
}

export async function updateGrantAction(
  id: string,
  _prev: GrantFormState,
  formData: FormData
): Promise<GrantFormState> {
  await requireAdmin();

  const parsed = readGrant(formData);
  if (!parsed.ok) return parsed.state;

  const supabase = await createClient();

  const { data: existing, error: readError } = await supabase
    .from("visa_grants")
    .select("photo_path, slug")
    .eq("id", id)
    .maybeSingle();

  if (readError) return { status: "error", message: readError.message };
  if (!existing) {
    return { status: "error", message: "That story no longer exists." };
  }

  const { error } = await supabase
    .from("visa_grants")
    .update(parsed.payload)
    .eq("id", id);

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      return {
        status: "error",
        message: "That slug is already in use.",
        fieldErrors: { slug: "Pick a different slug." },
      };
    }
    return { status: "error", message: friendlyError(error.message) };
  }

  // The photo was replaced or cleared, so the old object is now an orphan.
  if (existing.photo_path && existing.photo_path !== parsed.payload.photo_path) {
    await deleteImage("visa-grants", existing.photo_path);
  }

  revalidateGrants(parsed.payload.slug);
  if (existing.slug !== parsed.payload.slug) {
    revalidatePath(`${PUBLIC_PATH}/${existing.slug}`);
  }
  redirect(ADMIN_PATH);
}

export async function deleteGrantAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // Grab the object key before the row disappears with it.
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("visa_grants")
    .select("photo_path, slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("visa_grants").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await deleteImage("visa-grants", existing?.photo_path);

  revalidateGrants(existing?.slug);

  if (formData.get("redirect_to")) {
    redirect(ADMIN_PATH);
  }
}

export async function toggleGrantPublishedAction(
  formData: FormData
): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();

  // Read the stored values rather than trusting the submitted ones, so a stale
  // list page cannot flip a story to the wrong state — or past the consent gate.
  const { data: existing, error: readError } = await supabase
    .from("visa_grants")
    .select("is_published, consent_on_file, slug")
    .eq("id", id)
    .maybeSingle();

  if (readError) throw new Error(readError.message);
  if (!existing) return;

  if (!existing.is_published && !existing.consent_on_file) {
    throw new Error(
      "This story cannot be published until consent is recorded on the edit screen."
    );
  }

  const { error } = await supabase
    .from("visa_grants")
    .update({ is_published: !existing.is_published })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidateGrants(existing.slug);
}

export async function toggleGrantFeaturedAction(
  formData: FormData
): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();

  const { data: existing, error: readError } = await supabase
    .from("visa_grants")
    .select("is_featured, slug")
    .eq("id", id)
    .maybeSingle();

  if (readError) throw new Error(readError.message);
  if (!existing) return;

  const { error } = await supabase
    .from("visa_grants")
    .update({ is_featured: !existing.is_featured })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidateGrants(existing.slug);
}
