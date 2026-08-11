import type { BadgeTone } from "@/components/admin/ui";
import type {
  ActivityType,
  Lead,
  LeadActivity,
  LeadPriority,
  LeadStatus,
  PipelineStage,
  SourceType,
} from "@/lib/supabase/database.types";

/* -------------------------------------------------------------------------
 * Shared shapes
 *
 * These live outside `actions.ts` on purpose: a `"use server"` module may only
 * export async functions, so every constant the client needs has to sit in a
 * plain module like this one.
 * ---------------------------------------------------------------------- */

export type ActionResult = { ok: true } | { ok: false; error: string };

export type CrmFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  /**
   * Bumped on every settled submit. Two consecutive successes otherwise look
   * identical to `useEffect`, which is how the activity timeline knows to
   * reload after a second note is added.
   */
  token?: number;
};

export const IDLE_FORM_STATE: CrmFormState = { status: "idle" };

/** A column keyed by stage id, each holding its leads in display order. */
export type Board = Record<string, Lead[]>;

/** One lead's timeline, plus a lookup so it can name who did what. */
export type LeadActivityFeed = {
  activities: LeadActivity[];
  /** admin id -> display name */
  authors: Record<string, string>;
};

/* -------------------------------------------------------------------------
 * Card ordering — the gap scheme
 *
 * `leads.position` is a double, not an integer, and that is the whole trick:
 * when a card is dropped between two others it simply takes the MIDPOINT of
 * its neighbours' positions. One row is written, and no other card in the
 * column ever has to be renumbered.
 *
 * Fresh gaps are `POSITION_GAP` wide so there is always room to keep halving:
 *
 *   top of a column     -> firstPosition - 1000
 *   bottom of a column  -> lastPosition  + 1000
 *   between two cards   -> (before + after) / 2
 *   empty column        -> 0
 *
 * A double carries ~52 bits of mantissa, so roughly fifty consecutive drops
 * into the *same* gap would be needed before a midpoint stops being distinct
 * from its neighbours. Unreachable in practice, and the failure mode is a tie
 * rather than corruption — ties are broken on `created_at` when sorting.
 * ---------------------------------------------------------------------- */

export const POSITION_GAP = 1000;

/**
 * Position for the card now sitting at `index` of `orderedColumn`.
 *
 * `orderedColumn` must already contain the moved card at its final index; every
 * other card keeps the position it has in the database, which is what makes the
 * midpoint arithmetic below valid.
 */
export function positionForIndex(
  orderedColumn: readonly Lead[],
  index: number
): number {
  const before = index > 0 ? orderedColumn[index - 1] : undefined;
  const after =
    index < orderedColumn.length - 1 ? orderedColumn[index + 1] : undefined;

  if (!before && !after) return 0; // only card in an empty column
  if (!before) return after!.position - POSITION_GAP; // dropped at the top
  if (!after) return before.position + POSITION_GAP; // dropped at the bottom
  return (before.position + after.position) / 2; // midpoint of the gap
}

/** Position for a brand new card, which always goes to the top of its column. */
export function positionForNewCard(currentTopPosition: number | null): number {
  return (currentTopPosition ?? POSITION_GAP) - POSITION_GAP;
}

/* -------------------------------------------------------------------------
 * Board shaping
 * ---------------------------------------------------------------------- */

function byPosition(a: Lead, b: Lead) {
  if (a.position !== b.position) return a.position - b.position;
  return a.created_at.localeCompare(b.created_at);
}

/**
 * Buckets leads into their stage columns.
 *
 * Leads whose stage vanished (deleted in another tab) are dropped rather than
 * rendered into a column that no longer exists — the database re-homes them
 * into the default stage, so the next load puts them back on the board.
 */
export function groupLeadsByStage(
  stages: readonly PipelineStage[],
  leads: readonly Lead[]
): Board {
  const board: Board = {};
  for (const stage of stages) board[stage.id] = [];

  for (const lead of leads) {
    const column = board[lead.stage_id];
    if (column) column.push(lead);
  }

  for (const column of Object.values(board)) column.sort(byPosition);
  return board;
}

export function findLead(board: Board, leadId: string): Lead | null {
  for (const column of Object.values(board)) {
    const found = column.find((lead) => lead.id === leadId);
    if (found) return found;
  }
  return null;
}

export function stageIdOfLead(board: Board, leadId: string): string | null {
  for (const [stageId, column] of Object.entries(board)) {
    if (column.some((lead) => lead.id === leadId)) return stageId;
  }
  return null;
}

export function countLeads(board: Board): number {
  return Object.values(board).reduce((total, column) => total + column.length, 0);
}

/* -------------------------------------------------------------------------
 * Droppable ids
 *
 * A card's droppable id is its lead id. A *column* needs its own droppable so
 * that dropping into empty space still resolves to a stage — the classic
 * "can't drop into an empty column" bug. The prefix keeps the two id spaces
 * from ever colliding.
 * ---------------------------------------------------------------------- */

const STAGE_DROPPABLE_PREFIX = "stage:";

export function stageDroppableId(stageId: string): string {
  return `${STAGE_DROPPABLE_PREFIX}${stageId}`;
}

/** Resolves whatever dnd-kit reports as `over` down to a stage id. */
export function resolveStageId(board: Board, overId: string): string | null {
  if (overId.startsWith(STAGE_DROPPABLE_PREFIX)) {
    const stageId = overId.slice(STAGE_DROPPABLE_PREFIX.length);
    return stageId in board ? stageId : null;
  }
  return stageIdOfLead(board, overId);
}

/* -------------------------------------------------------------------------
 * Presentation
 * ---------------------------------------------------------------------- */

export const SOURCE_META: Record<
  SourceType,
  { label: string; tone: BadgeTone }
> = {
  form: { label: "Form", tone: "blue" },
  ai_agent: { label: "AI agent", tone: "violet" },
  manual: { label: "Manual", tone: "slate" },
  import: { label: "Import", tone: "amber" },
};

export const PRIORITY_META: Record<
  LeadPriority,
  { label: string; dotClass: string }
> = {
  high: { label: "High priority", dotClass: "bg-red-500" },
  medium: { label: "Medium priority", dotClass: "bg-amber-400" },
  low: { label: "Low priority", dotClass: "bg-slate-300" },
};

export const STATUS_META: Record<
  LeadStatus,
  { label: string; tone: BadgeTone }
> = {
  open: { label: "Open", tone: "blue" },
  won: { label: "Won", tone: "green" },
  lost: { label: "Lost", tone: "red" },
};

export const ACTIVITY_META: Record<ActivityType, { label: string }> = {
  created: { label: "Created" },
  note: { label: "Note" },
  call: { label: "Call" },
  email: { label: "Email" },
  meeting: { label: "Meeting" },
  stage_change: { label: "Stage change" },
};

export const PRIORITY_OPTIONS: LeadPriority[] = ["low", "medium", "high"];
export const STATUS_OPTIONS: LeadStatus[] = ["open", "won", "lost"];

/** Types an admin can log by hand. `created` and `stage_change` are automatic. */
export const NOTE_TYPE_OPTIONS: ActivityType[] = [
  "note",
  "call",
  "email",
  "meeting",
];

/** Sensible for an Australian education consultancy and its source markets. */
export const CURRENCY_OPTIONS = [
  "AUD",
  "USD",
  "GBP",
  "EUR",
  "NZD",
  "INR",
  "NPR",
  "PKR",
  "BDT",
  "LKR",
] as const;

/** A small, deliberately limited palette so boards stay legible. */
export const STAGE_COLOR_PRESETS = [
  "#2563eb",
  "#7c3aed",
  "#0891b2",
  "#0d9488",
  "#16a34a",
  "#ca8a04",
  "#ea580c",
  "#dc2626",
  "#db2777",
  "#475569",
] as const;

export const DEFAULT_STAGE_COLOR = STAGE_COLOR_PRESETS[0];

export function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function formatMoney(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    // `currency` came from a free-text column, so an unknown code is possible.
    return `${currency} ${Math.round(value).toLocaleString("en-AU")}`;
  }
}

/**
 * Totals a set of leads per currency.
 *
 * Summing mixed currencies into one number would be a lie, so each is reported
 * separately — in the overwhelmingly common single-currency case this renders
 * as one figure.
 */
export function sumByCurrency(
  leads: readonly Lead[]
): { currency: string; total: number }[] {
  const totals = new Map<string, number>();

  for (const lead of leads) {
    if (lead.value === null) continue;
    totals.set(lead.currency, (totals.get(lead.currency) ?? 0) + lead.value);
  }

  return [...totals.entries()]
    .map(([currency, total]) => ({ currency, total }))
    .sort((a, b) => b.total - a.total);
}

export function formatTotals(leads: readonly Lead[]): string | null {
  const totals = sumByCurrency(leads);
  if (totals.length === 0) return null;
  return totals.map(({ currency, total }) => formatMoney(total, currency)).join(" · ");
}
