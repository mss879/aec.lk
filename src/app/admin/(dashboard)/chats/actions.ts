"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/auth";
import { appendMessages, isValidSessionId } from "@/lib/ai/chat-store";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Server Actions for the live chat inbox.
 *
 * Every export starts with `await requireAdmin()` — Server Actions are plain
 * POST endpoints, so the UI being behind a login is not a defence. Writes go
 * through the service-role client because the visitor's side of the
 * conversation has no Supabase session of its own.
 */

const ADMIN_PATH = "/admin/chats";

export type ReplyState = { status: "idle" | "error"; message?: string };

function paths(sessionId: string) {
  revalidatePath(ADMIN_PATH);
  revalidatePath(`${ADMIN_PATH}/${sessionId}`);
}

/**
 * Pause or resume the AI on one conversation.
 *
 * Pausing is what "jump in" means: the API route sees `agent_enabled = false`
 * and stops answering, so the visitor is talking to a person from that moment
 * until it is switched back.
 */
export async function toggleAgentAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();

  const sessionId = String(formData.get("session_id") ?? "");
  if (!isValidSessionId(sessionId)) return;

  const supabase = createAdminClient();

  // Read the stored value rather than trusting the submitted one, so a stale
  // page cannot flip a conversation into the wrong mode.
  const { data: session, error } = await supabase
    .from("ai_chat_sessions")
    .select("agent_enabled")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!session) return;

  const takingOver = session.agent_enabled;

  const { error: updateError } = await supabase
    .from("ai_chat_sessions")
    .update({ agent_enabled: !session.agent_enabled })
    .eq("session_id", sessionId);

  if (updateError) throw new Error(updateError.message);

  // Tell the visitor what happened, in the transcript itself, so the handover
  // is never silent from their side.
  const name = admin.full_name?.trim() || "An AEC counsellor";
  await appendMessages(sessionId, [
    {
      role: "admin",
      content: takingOver
        ? `${name} has joined the chat and will take it from here.`
        : `${name} has handed you back to AEC Assist. Ask away!`,
      adminId: admin.id,
      authorName: name,
    },
  ]);

  paths(sessionId);
}

/** Sends a counsellor's message into the visitor's chat window. */
export async function sendReplyAction(
  _prev: ReplyState,
  formData: FormData
): Promise<ReplyState> {
  const admin = await requireAdmin();

  const sessionId = String(formData.get("session_id") ?? "");
  if (!isValidSessionId(sessionId)) {
    return { status: "error", message: "That conversation could not be found." };
  }

  const body = String(formData.get("body") ?? "").trim();
  if (!body) return { status: "error", message: "Write a message first." };
  if (body.length > 4_000) {
    return { status: "error", message: "Keep replies under 4,000 characters." };
  }

  const supabase = createAdminClient();

  // Replying implies taking over — otherwise the agent would keep answering
  // alongside the counsellor and the visitor would hear two voices.
  const { data: session } = await supabase
    .from("ai_chat_sessions")
    .select("agent_enabled")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (session?.agent_enabled) {
    await supabase
      .from("ai_chat_sessions")
      .update({ agent_enabled: false })
      .eq("session_id", sessionId);
  }

  await appendMessages(sessionId, [
    {
      role: "admin",
      content: body,
      adminId: admin.id,
      authorName: admin.full_name?.trim() || "AEC Counsellor",
    },
  ]);

  paths(sessionId);
  return { status: "idle" };
}

/** Marks everything currently in the conversation as read. */
export async function markReadAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const sessionId = String(formData.get("session_id") ?? "");
  if (!isValidSessionId(sessionId)) return;

  const supabase = createAdminClient();
  await supabase
    .from("ai_chat_sessions")
    .update({ admin_read_at: new Date().toISOString() })
    .eq("session_id", sessionId);

  paths(sessionId);
}

/** Archives a finished conversation out of the open inbox, or restores it. */
export async function toggleStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const sessionId = String(formData.get("session_id") ?? "");
  if (!isValidSessionId(sessionId)) return;

  const supabase = createAdminClient();

  const { data: session } = await supabase
    .from("ai_chat_sessions")
    .select("status")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (!session) return;

  await supabase
    .from("ai_chat_sessions")
    .update({ status: session.status === "open" ? "closed" : "open" })
    .eq("session_id", sessionId);

  paths(sessionId);
}
