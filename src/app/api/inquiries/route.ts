/**
 * =============================================================================
 * POST /api/inquiries — external intake for the AI agent
 * =============================================================================
 *
 * Hand this contract to the agent (or any third-party form) that needs to file
 * inquiries into the back office.
 *
 * AUTH
 *   Header `x-api-key: <INQUIRIES_API_KEY>`.
 *   If `INQUIRIES_API_KEY` is not configured on the server the endpoint refuses
 *   every request with 503 — it fails closed, never open.
 *
 * REQUEST  Content-Type: application/json
 *   {
 *     "first_name":   "Dinuka",                   // required
 *     "email":        "dinuka@example.com",       // required
 *     "last_name":    "Perera",                   // optional
 *     "phone":        "+94 77 123 4567",          // optional
 *     "interest":     "Study in Australia",       // optional, free text
 *     "message":      "Looking at Masters...",    // optional, max 5000 chars
 *     "agent_name":   "AEC Web Agent",            // optional, shown in the UI
 *     "source_type":  "ai_agent",                 // optional, "ai_agent" (default) or "form"
 *     "source_form":  "contact_consultation",     // optional machine key
 *     "source_label": "Contact Page — Free Consultation",  // optional, inferred from source_form
 *     "source_page":  "/contact",                 // optional, inferred from source_form
 *     "metadata":     { "transcript_id": "..." }  // optional JSON object, max 8KB serialised
 *   }
 *
 *   `source_type` may NOT be "manual" or "import" — those mean "a human at AEC
 *   typed this in" and "we bulk-loaded this", and an external caller must not be
 *   able to disguise itself as either.
 *
 * RESPONSES  (always JSON)
 *   201  { "id": "<uuid>" }
 *   400  { "error": "...", "fields"?: { "email": "..." } }
 *   401  { "error": "Invalid API key." }
 *   405  { "error": "..." }             GET and friends
 *   503  { "error": "..." }             endpoint not configured
 *   500  { "error": "..." }             unexpected failure, details stay in the logs
 *
 * The inquiry lands in /admin/inquiries with status "new".
 * =============================================================================
 */

import { createHash, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import {
  resolveFormSource,
  createInquiry,
  validateInquiryInput,
} from "@/lib/inquiries";
import type { SourceType } from "@/lib/supabase/database.types";

// Uses node:crypto and the service-role key — never the edge runtime.
export const runtime = "nodejs";

/** A caller may claim to be the agent or an external form, nothing more. */
const ALLOWED_SOURCE_TYPES: SourceType[] = ["ai_agent", "form"];

function json(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/**
 * Constant-time secret comparison with no extra dependency.
 *
 * `timingSafeEqual` throws on length mismatch — which would itself leak the key
 * length — so both sides are hashed to a fixed 32 bytes first and the digests
 * are compared instead.
 */
function secretsMatch(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const expectedKey = process.env.INQUIRIES_API_KEY;

  // Fail closed. An unset key means "intake is switched off", not "let anyone
  // write to the inquiries table".
  if (!expectedKey) {
    return json(
      {
        error:
          "Inquiry intake is not configured on this server. Set INQUIRIES_API_KEY to enable it.",
      },
      503
    );
  }

  const providedKey = request.headers.get("x-api-key") ?? "";

  if (!providedKey || !secretsMatch(providedKey, expectedKey)) {
    return json({ error: "Invalid API key." }, 401);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Request body must be valid JSON." }, 400);
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return json({ error: "Request body must be a JSON object." }, 400);
  }

  const payload = body as Record<string, unknown>;

  // Provenance is ours to decide, not the caller's.
  const requestedSourceType =
    typeof payload.source_type === "string" ? payload.source_type.trim() : "";

  if (
    requestedSourceType &&
    !ALLOWED_SOURCE_TYPES.includes(requestedSourceType as SourceType)
  ) {
    return json(
      {
        error: `source_type must be one of ${ALLOWED_SOURCE_TYPES.join(" or ")}.`,
        fields: { source_type: "Not allowed for external callers." },
      },
      400
    );
  }

  const sourceType: SourceType =
    (requestedSourceType as SourceType) || "ai_agent";

  // A known form key fills in the label and page so the back office renders the
  // same badge it would for a submission made on the website itself.
  const sourceForm =
    typeof payload.source_form === "string" ? payload.source_form.trim() : "";
  const known = resolveFormSource(sourceForm);

  const result = validateInquiryInput({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phone: payload.phone,
    interest: payload.interest,
    message: payload.message,
    agent_name: payload.agent_name,
    source_type: sourceType,
    source_form: sourceForm || null,
    source_label: payload.source_label ?? known?.label ?? null,
    source_page: payload.source_page ?? known?.page ?? null,
    metadata: payload.metadata,
  });

  if (!result.ok) {
    return json(
      { error: "Some fields are invalid.", fields: result.errors },
      400
    );
  }

  try {
    const id = await createInquiry(result.value);
    return json({ id }, 201);
  } catch (error) {
    console.error("[api/inquiries] failed to store inquiry", error);
    return json({ error: "Could not store the inquiry." }, 500);
  }
}

/**
 * Declared on purpose. Without it a GET would return Next.js's own 405 with an
 * HTML-ish body; an integration debugging its wiring is better served by a JSON
 * answer that names the method it should have used.
 */
export async function GET() {
  return Response.json(
    { error: "Use POST with an x-api-key header to file an inquiry." },
    { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } }
  );
}
