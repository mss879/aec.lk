/**
 * =============================================================================
 * GET /api/chat/messages — the widget's poll for counsellor replies
 * =============================================================================
 *
 * Query: ?sessionId=<id>&after=<iso timestamp>
 *
 * Returns any messages newer than `after` plus whether a human has taken the
 * conversation over. The widget polls this while it is open so a counsellor's
 * reply appears without a page refresh.
 *
 * Access control is the session id itself: it is a client-generated UUID that
 * only that visitor's browser holds, and it is never rendered into the page.
 * Nothing here accepts a user id or lists sessions, so knowing one id reveals
 * one conversation and no others.
 * =============================================================================
 */

import type { NextRequest } from "next/server";
import { isValidSessionId, readMessages } from "@/lib/ai/chat-store";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
// The whole point is fresh messages; never let a CDN answer this.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const sessionId = searchParams.get("sessionId");
  if (!isValidSessionId(sessionId)) {
    return Response.json({ error: "A valid sessionId is required." }, {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const afterRaw = searchParams.get("after");
  // Reject anything that is not a real timestamp rather than passing it to
  // Postgres and letting the query error out.
  const after =
    afterRaw && !Number.isNaN(Date.parse(afterRaw)) ? afterRaw : null;

  try {
    const supabase = createAdminClient();
    const { data: session } = await supabase
      .from("ai_chat_sessions")
      .select("agent_enabled")
      .eq("session_id", sessionId)
      .maybeSingle();

    const messages = await readMessages(sessionId, after);

    return Response.json(
      {
        messages,
        // `true` once a counsellor has paused the agent, so the widget can say
        // who the visitor is now talking to.
        handedOver: session ? !session.agent_enabled : false,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[api/chat/messages] poll failed:", error);
    return Response.json(
      { messages: [], handedOver: false },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  }
}
