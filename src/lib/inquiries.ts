import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { BadgeTone } from "@/components/admin/ui";
import type {
  InquiryStatus,
  Json,
  SourceType,
} from "@/lib/supabase/database.types";

/**
 * The shared vocabulary for inquiries: where a submission came from, what state
 * it is in, how to validate one, and how to store it.
 *
 * `server-only` is deliberate. `createInquiry` writes with the service-role key,
 * which bypasses Row Level Security, so nothing in this file may ever end up in
 * a Client Component bundle. If a Client Component needs one of these lists,
 * pass it down as a prop from a Server Component instead of importing it.
 */

// --- Which form produced the submission -----------------------------------

export type FormSourceMeta = {
  /** Human label shown in the back office. */
  label: string;
  /** Path the form lives on, recorded so admins can find it again. */
  page: string;
};

/**
 * Every website form that writes an inquiry, keyed by its machine name.
 *
 * ADDING A NEW FORM IS ONE LINE: add an entry here, then pass its key to
 * `createInquiry` as `source_form`. The key type below is derived from this
 * object, so TypeScript will immediately accept the new key everywhere and
 * reject typos.
 */
export const FORM_SOURCES = {
  contact_consultation: {
    label: "Contact Page — Free Consultation",
    page: "/contact",
  },
} as const satisfies Record<string, FormSourceMeta>;

export type FormSourceKey = keyof typeof FORM_SOURCES;

/** All known form keys, for filter dropdowns. */
export const FORM_SOURCE_KEYS = Object.keys(FORM_SOURCES) as FormSourceKey[];

export function isFormSourceKey(value: string): value is FormSourceKey {
  return Object.prototype.hasOwnProperty.call(FORM_SOURCES, value);
}

/**
 * Look up a form key, tolerating unknown ones — an external integration may
 * post a `source_form` we have never heard of, and losing that string would be
 * worse than showing it raw.
 */
export function resolveFormSource(
  key: string | null | undefined
): FormSourceMeta | null {
  if (!key) return null;
  return isFormSourceKey(key) ? FORM_SOURCES[key] : null;
}

// --- Statuses -------------------------------------------------------------

export type InquiryStatusMeta = {
  value: InquiryStatus;
  label: string;
  tone: BadgeTone;
};

/** Ordered roughly by how far along the inquiry is. */
export const INQUIRY_STATUSES: readonly InquiryStatusMeta[] = [
  { value: "new", label: "New", tone: "blue" },
  { value: "contacted", label: "Contacted", tone: "amber" },
  { value: "qualified", label: "Qualified", tone: "violet" },
  { value: "unqualified", label: "Unqualified", tone: "red" },
  { value: "converted", label: "Converted", tone: "green" },
  { value: "archived", label: "Archived", tone: "slate" },
];

export function isInquiryStatus(value: string): value is InquiryStatus {
  return INQUIRY_STATUSES.some((status) => status.value === value);
}

export function inquiryStatusMeta(value: InquiryStatus): InquiryStatusMeta {
  return (
    INQUIRY_STATUSES.find((status) => status.value === value) ?? {
      value,
      label: value,
      tone: "slate",
    }
  );
}

// --- Source types ---------------------------------------------------------

export const SOURCE_TYPE_META: Record<
  SourceType,
  { label: string; tone: BadgeTone; description: string }
> = {
  form: {
    label: "Website form",
    tone: "blue",
    description: "A visitor filled in a form on the public website.",
  },
  ai_agent: {
    label: "AI agent",
    tone: "violet",
    description: "Captured by the AI agent through the intake API.",
  },
  manual: {
    label: "Added by hand",
    tone: "slate",
    description: "Typed into the back office by a staff member.",
  },
  import: {
    label: "Imported",
    tone: "amber",
    description: "Loaded in bulk from a spreadsheet or another system.",
  },
};

export const SOURCE_TYPES = Object.keys(SOURCE_TYPE_META) as SourceType[];

export function isSourceType(value: string): value is SourceType {
  return Object.prototype.hasOwnProperty.call(SOURCE_TYPE_META, value);
}

/**
 * One line that makes an inquiry's origin obvious at a glance:
 * "Contact Page — Free Consultation", or "AI agent · Nova".
 */
export function describeSource(inquiry: {
  source_type: SourceType;
  source_form: string | null;
  source_label: string | null;
  agent_name: string | null;
}): string {
  const base = SOURCE_TYPE_META[inquiry.source_type]?.label ?? "Unknown source";

  if (inquiry.source_type === "ai_agent") {
    return inquiry.agent_name ? `${base} · ${inquiry.agent_name}` : base;
  }

  const label =
    inquiry.source_label ??
    resolveFormSource(inquiry.source_form)?.label ??
    inquiry.source_form;

  return label ? label : base;
}

// --- Validation -----------------------------------------------------------

/**
 * Maximum lengths. Anything past these is either a mistake or an attack, and
 * the database has no length constraints of its own to fall back on.
 */
const LIMITS = {
  first_name: 80,
  last_name: 80,
  email: 254,
  phone: 40,
  interest: 120,
  message: 5000,
  agent_name: 120,
  source_form: 80,
  source_label: 160,
  source_page: 300,
} as const;

/** Serialised `metadata` bigger than this is refused rather than stored. */
const METADATA_LIMIT = 8000;

/**
 * Deliberately conservative, hand-rolled (there is no validation library in
 * this project): a local part with no whitespace or `@`, then a domain of at
 * least two dot-separated labels. Rejects `a@b` and `a b@c.com`; accepts the
 * shapes real students actually use.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

export type InquiryField =
  | keyof typeof LIMITS
  | "source_type"
  | "metadata";

export type InquiryFieldErrors = Partial<Record<InquiryField, string>>;

/** Raw, untrusted input — from a FormData or a JSON request body. */
export type InquiryInput = {
  first_name?: unknown;
  last_name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  agent_name?: unknown;
  source_type?: unknown;
  source_form?: unknown;
  source_label?: unknown;
  source_page?: unknown;
  metadata?: unknown;
};

/** Clean, trimmed, ready to insert. */
export type ValidatedInquiry = {
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  interest: string | null;
  message: string | null;
  agent_name: string | null;
  source_type: SourceType;
  source_form: string | null;
  source_label: string | null;
  source_page: string | null;
  metadata: Json;
};

export type InquiryValidation =
  | { ok: true; value: ValidatedInquiry }
  | { ok: false; errors: InquiryFieldErrors };

/** Coerce anything into a trimmed string; non-text becomes "". */
function text(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

/** Trimmed value, or null when empty — the database prefers null to "". */
function optional(value: unknown): string | null {
  const trimmed = text(value);
  return trimmed.length > 0 ? trimmed : null;
}

function normaliseMetadata(
  value: unknown,
  errors: InquiryFieldErrors
): Json {
  if (value === undefined || value === null) return {};

  if (typeof value !== "object" || Array.isArray(value)) {
    errors.metadata = "metadata must be a JSON object.";
    return {};
  }

  let serialised: string;
  try {
    serialised = JSON.stringify(value);
  } catch {
    errors.metadata = "metadata could not be serialised to JSON.";
    return {};
  }

  if (!serialised) {
    errors.metadata = "metadata could not be serialised to JSON.";
    return {};
  }

  if (serialised.length > METADATA_LIMIT) {
    errors.metadata = `metadata must be under ${METADATA_LIMIT} characters once serialised.`;
    return {};
  }

  return JSON.parse(serialised) as Json;
}

/**
 * Validates and normalises an inquiry. Returns field-keyed errors rather than
 * throwing, so both the contact form and the intake API can render them.
 *
 * Callers that care about provenance (the API route in particular) should check
 * `source_type` themselves before calling — this only rejects values that are
 * not one of the four the database allows.
 */
export function validateInquiryInput(input: InquiryInput): InquiryValidation {
  const errors: InquiryFieldErrors = {};

  const first_name = text(input.first_name);
  if (!first_name) {
    errors.first_name = "Please enter a first name.";
  } else if (first_name.length > LIMITS.first_name) {
    errors.first_name = `First name must be ${LIMITS.first_name} characters or fewer.`;
  }

  const last_name = optional(input.last_name);
  if (last_name && last_name.length > LIMITS.last_name) {
    errors.last_name = `Last name must be ${LIMITS.last_name} characters or fewer.`;
  }

  const email = text(input.email).toLowerCase();
  if (!email) {
    errors.email = "Please enter an email address.";
  } else if (email.length > LIMITS.email) {
    errors.email = `Email address must be ${LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = optional(input.phone);
  if (phone && phone.length > LIMITS.phone) {
    errors.phone = `Phone number must be ${LIMITS.phone} characters or fewer.`;
  }

  const interest = optional(input.interest);
  if (interest && interest.length > LIMITS.interest) {
    errors.interest = `Interest must be ${LIMITS.interest} characters or fewer.`;
  }

  const message = optional(input.message);
  if (message && message.length > LIMITS.message) {
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;
  }

  const agent_name = optional(input.agent_name);
  if (agent_name && agent_name.length > LIMITS.agent_name) {
    errors.agent_name = `Agent name must be ${LIMITS.agent_name} characters or fewer.`;
  }

  const rawSourceType = text(input.source_type);
  let source_type: SourceType = "form";
  if (rawSourceType) {
    if (!isSourceType(rawSourceType)) {
      errors.source_type = `source_type must be one of ${SOURCE_TYPES.join(", ")}.`;
    } else {
      source_type = rawSourceType;
    }
  }

  const source_form = optional(input.source_form);
  if (source_form && source_form.length > LIMITS.source_form) {
    errors.source_form = `source_form must be ${LIMITS.source_form} characters or fewer.`;
  }

  const source_label = optional(input.source_label);
  if (source_label && source_label.length > LIMITS.source_label) {
    errors.source_label = `source_label must be ${LIMITS.source_label} characters or fewer.`;
  }

  const source_page = optional(input.source_page);
  if (source_page && source_page.length > LIMITS.source_page) {
    errors.source_page = `source_page must be ${LIMITS.source_page} characters or fewer.`;
  }

  const metadata = normaliseMetadata(input.metadata, errors);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      first_name,
      last_name,
      email,
      phone,
      interest,
      message,
      agent_name,
      source_type,
      source_form,
      source_label,
      source_page,
      metadata,
    },
  };
}

// --- Persistence ----------------------------------------------------------

/**
 * Inserts an inquiry and returns its id.
 *
 * Uses the service-role client on purpose: anonymous visitors have no RLS grant
 * on `public.inquiries` by design (see `supabase/migrations/0002_inquiries.sql`),
 * which keeps the table unreadable from the browser. Every write therefore has
 * to happen on the server, behind validation.
 *
 * Pass the `value` from `validateInquiryInput` — never a raw request body.
 * Throws on a database failure; callers should catch, log server-side, and show
 * the visitor something friendly.
 */
export async function createInquiry(input: ValidatedInquiry): Promise<string> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("inquiries")
    .insert({ ...input, status: "new" })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(
      `Could not store inquiry: ${error?.message ?? "no row returned"}`
    );
  }

  return data.id;
}
