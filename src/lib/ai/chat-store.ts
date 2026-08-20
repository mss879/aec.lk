import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { ChatRole } from "@/lib/supabase/database.types";

/**
 * Everything that touches the chat transcript tables.
 *
 * The visitor-facing API route and the back-office actions both write here, so
 * the rules about session bookkeeping (message counts, last-message stamps,
 * takeover state) live in exactly one place.
 */

/** Shape the widget renders. Deliberately narrower than the database row. */
export type PublicChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  authorName: string | null;
  createdAt: string;
};

/** Session ids come from the browser, so they are validated, never trusted. */
export function isValidSessionId(value: unknown): value is string {
  return typeof value === "string" && /^[\w-]{8,64}$/.test(value);
}

/**
 * Creates the session row on first contact and returns its current state.
 * Called on every visitor message, so it must stay a single upsert.
 */
export async function ensureSession(
  sessionId: string,
  firstPage?: string | null
) {
  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("ai_chat_sessions")
    .select("id, agent_enabled, status")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existing) return existing;

  const { data: created, error } = await supabase
    .from("ai_chat_sessions")
    .insert({
      session_id: sessionId,
      first_page: firstPage?.slice(0, 300) ?? null,
    })
    .select("id, agent_enabled, status")
    .single();

  if (error || !created) {
    // A second tab can race us to the insert; re-read rather than fail the chat.
    const { data: raced } = await supabase
      .from("ai_chat_sessions")
      .select("id, agent_enabled, status")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (raced) return raced;

    console.error("[chat-store] could not open session:", error?.message);
    return null;
  }

  return created;
}

/**
 * Appends messages and rolls the session's counters forward.
 *
 * Best-effort by design: a transcript that fails to save must never break the
 * conversation the visitor is having.
 */
export async function appendMessages(
  sessionId: string,
  rows: {
    role: ChatRole;
    content: string;
    adminId?: string | null;
    authorName?: string | null;
  }[]
) {
  if (rows.length === 0) return;

  try {
    const supabase = createAdminClient();

    const { error } = await supabase.from("ai_chat_messages").insert(
      rows.map((row) => ({
        session_id: sessionId,
        role: row.role,
        content: row.content.slice(0, 8_000),
        admin_id: row.adminId ?? null,
        author_name: row.authorName ?? null,
      }))
    );

    if (error) {
      console.error("[chat-store] message insert failed:", error.message);
      return;
    }

    // Read-then-write rather than a raw increment: the counter is a display
    // convenience, and this keeps the module free of SQL functions.
    const { data: session } = await supabase
      .from("ai_chat_sessions")
      .select("message_count")
      .eq("session_id", sessionId)
      .maybeSingle();

    await supabase
      .from("ai_chat_sessions")
      .update({
        message_count: (session?.message_count ?? 0) + rows.length,
        last_message_at: new Date().toISOString(),
      })
      .eq("session_id", sessionId);
  } catch (error) {
    console.error("[chat-store] append failed:", error);
  }
}

/** Records who the visitor is once the agent has captured a lead. */
export async function attachLeadToSession(
  sessionId: string,
  lead: { id: string; name: string; phone: string }
) {
  try {
    const supabase = createAdminClient();
    await supabase
      .from("ai_chat_sessions")
      .update({
        lead_id: lead.id,
        visitor_name: lead.name,
        visitor_phone: lead.phone,
      })
      .eq("session_id", sessionId);
  } catch (error) {
    console.error("[chat-store] could not attach lead:", error);
  }
}

/**
 * Messages the widget should show, optionally only those newer than `after`.
 *
 * Scoped by session id, which is the widget's own — this is how the visitor
 * polls for counsellor replies without any direct database access.
 */
export async function readMessages(
  sessionId: string,
  after?: string | null
): Promise<PublicChatMessage[]> {
  const supabase = createAdminClient();

  let query = supabase
    .from("ai_chat_messages")
    .select("id, role, content, author_name, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(200);

  if (after) query = query.gt("created_at", after);

  const { data, error } = await query;

  if (error) {
    console.error("[chat-store] read failed:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    role: row.role,
    content: row.content,
    authorName: row.author_name,
    createdAt: row.created_at,
  }));
}
