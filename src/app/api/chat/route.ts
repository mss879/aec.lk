/**
 * =============================================================================
 * POST /api/chat — the AEC Assist website agent
 * =============================================================================
 *
 * Receives { messages, sessionId } from the chat widget, answers with OpenAI,
 * and — when the model has collected a name and phone number from an
 * interested visitor — creates a card directly on the CRM board (/admin/crm):
 * default stage, top of the column, source "AI agent", with the conversation
 * notes on the card. Email is deliberately NOT required; counsellors in
 * Colombo follow up by phone/WhatsApp.
 *
 * Cost design (the site has ~60 pages of content):
 * - The entire site is distilled into ONE static system prompt (lib/ai). A
 *   static prefix means OpenAI's automatic prompt caching applies — cached
 *   input tokens are billed at a ~90% discount — so "the agent knows every
 *   page" costs almost nothing per message after the first.
 * - Default model is gpt-5-mini: strong reasoning at a fraction of full-size
 *   pricing. Override with OPENAI_MODEL without a deploy.
 * - History is trimmed server-side to the most recent turns; the knowledge
 *   lives in the system prompt, so old turns carry no knowledge worth keeping.
 *
 * The OpenAI call is a plain fetch to /v1/chat/completions with a manual
 * two-step tool loop — no SDK, so no breaking-version churn.
 * =============================================================================
 */

import type { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import {
  appendMessages,
  attachLeadToSession,
  ensureSession,
  isValidSessionId,
} from "@/lib/ai/chat-store";
import { createAdminClient } from "@/lib/supabase/admin";

// Uses the service-role key; never the edge runtime.
export const runtime = "nodejs";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL ?? "gpt-5-mini";

/**
 * gpt-5 models spend "reasoning" tokens from this same budget before writing a
 * single visible word, so the cap must leave room for both. reasoning_effort
 * "low" keeps that overhead (and latency) small — right for a sales chat that
 * answers from a knowledge base rather than solving puzzles.
 */
const MAX_COMPLETION_TOKENS = 2_000;
const REASONING_EFFORT = "low";

/** Only the recent turns are sent — the system prompt carries the knowledge. */
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2_000;

const FALLBACK_REPLY =
  "I'm having a little trouble right now. You can reach our counsellors directly at **edu@multinational.com.au**, call **+94 77 395 0448**, or book a free consultation at /contact.";

type ChatMessage = { role: "user" | "assistant"; content: string };

type OpenAiToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

type OpenAiMessage =
  | { role: "system" | "user" | "assistant"; content: string }
  | { role: "assistant"; content: string | null; tool_calls: OpenAiToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };

/** The single tool the agent can use: put a lead on the CRM board. */
const TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "save_lead",
      description:
        "Save an interested visitor as a lead in AEC's CRM so a counsellor calls them back. Call ONLY after the visitor has given their name and a phone number, and at most once per conversation.",
      parameters: {
        type: "object",
        properties: {
          full_name: { type: "string", description: "Visitor's name as they gave it" },
          phone: {
            type: "string",
            description:
              "Phone or WhatsApp number, with country code when given (Sri Lankan numbers start +94)",
          },
          interest: {
            type: "string",
            description:
              "What they want, e.g. 'Master of Data Science in Australia', 'Partner visa', 'School placement for my son'",
          },
          notes: {
            type: "string",
            description:
              "2-4 sentence summary of the conversation for the counsellor who will call: their situation, questions asked, budget or timeline if mentioned",
          },
        },
        required: ["full_name", "phone", "notes"],
        additionalProperties: false,
      },
    },
  },
];

function json(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/** Loose sanity check, not a format police — counsellors dial these by hand. */
function looksLikePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Executes the save_lead tool: a card straight onto the CRM board, mirroring
 * what `promote_inquiry_to_lead` does — default stage, top of the column, and
 * a "created" entry on the activity timeline. Always returns a JSON string
 * for the model.
 */
async function executeSaveLead(
  rawArguments: string,
  sessionId: string
): Promise<string> {
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(rawArguments) as Record<string, unknown>;
  } catch {
    return JSON.stringify({ success: false, error: "Arguments were not valid JSON." });
  }

  const fullName =
    typeof parsed.full_name === "string" ? parsed.full_name.trim().slice(0, 160) : "";
  const phone =
    typeof parsed.phone === "string" ? parsed.phone.trim().slice(0, 40) : "";
  const interest =
    typeof parsed.interest === "string" && parsed.interest.trim()
      ? parsed.interest.trim().slice(0, 200)
      : null;
  const notes =
    typeof parsed.notes === "string" && parsed.notes.trim()
      ? parsed.notes.trim().slice(0, 2_000)
      : null;

  // Field-level feedback lets the model re-ask for exactly what was wrong
  // instead of giving up.
  const fieldErrors: Record<string, string> = {};
  if (!fullName) fieldErrors.full_name = "A name is required.";
  if (!phone || !looksLikePhone(phone)) {
    fieldErrors.phone = "A dialable phone number is required.";
  }
  if (Object.keys(fieldErrors).length) {
    return JSON.stringify({ success: false, fieldErrors });
  }

  try {
    const supabase = createAdminClient();

    const { data: stage, error: stageError } = await supabase
      .from("pipeline_stages")
      .select("id")
      .eq("is_default", true)
      .limit(1)
      .maybeSingle();

    if (stageError || !stage) {
      console.error("[api/chat] no default pipeline stage:", stageError?.message);
      return JSON.stringify({ success: false, error: "The CRM board is not configured." });
    }

    // New cards go to the top of the column, same as promoted inquiries.
    const { data: topCard } = await supabase
      .from("leads")
      .select("position")
      .eq("stage_id", stage.id)
      .order("position", { ascending: true })
      .limit(1)
      .maybeSingle();

    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert({
        stage_id: stage.id,
        full_name: fullName,
        phone,
        interest,
        notes,
        source_type: "ai_agent",
        source_label: "AEC Assist chat",
        position: (topCard?.position ?? 0) - 1000,
      })
      .select("id")
      .single();

    if (insertError || !lead) {
      console.error("[api/chat] lead insert failed:", insertError?.message);
      return JSON.stringify({ success: false, error: "The lead could not be stored." });
    }

    // Timeline opener; the transcript stays reachable via the session id.
    const { error: activityError } = await supabase.from("lead_activities").insert({
      lead_id: lead.id,
      type: "created",
      body: `Captured by AEC Assist on the website chat (session ${sessionId}).`,
    });
    if (activityError) {
      console.error("[api/chat] activity insert failed:", activityError.message);
    }

    // Link the card to the transcript so a counsellor opening either one can
    // reach the other.
    await attachLeadToSession(sessionId, {
      id: lead.id,
      name: fullName,
      phone,
    });

    return JSON.stringify({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("[api/chat] save_lead failed:", error);
    return JSON.stringify({ success: false, error: "The lead could not be stored." });
  }
}

async function callOpenAi(apiKey: string, messages: OpenAiMessage[]) {
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      tools: TOOLS,
      max_completion_tokens: MAX_COMPLETION_TOKENS,
      // Ignored by models without reasoning; essential on gpt-5 family.
      reasoning_effort: REASONING_EFFORT,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI ${response.status}: ${detail.slice(0, 500)}`);
  }

  const data = (await response.json()) as {
    choices: {
      message: { content: string | null; tool_calls?: OpenAiToolCall[] };
      finish_reason?: string;
    }[];
  };

  const choice = data.choices[0];
  if (choice && !choice.message?.content?.trim() && !choice.message?.tool_calls?.length) {
    console.error(
      `[api/chat] empty completion (finish_reason=${choice.finish_reason}) — if "length", reasoning consumed the token budget.`
    );
  }

  return choice?.message;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Fails soft: the widget shows the same friendly copy it shows on any
    // outage, and the human contact channels still work.
    console.error("[api/chat] OPENAI_API_KEY is not set.");
    return json({ content: FALLBACK_REPLY }, 200);
  }

  let body: { messages?: unknown; sessionId?: unknown; page?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Body must be JSON." }, 400);
  }

  const sessionId = isValidSessionId(body.sessionId) ? body.sessionId : null;
  if (!sessionId) return json({ error: "A sessionId is required." }, 400);

  const page =
    typeof body.page === "string" && body.page.startsWith("/") ? body.page : null;

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return json({ error: "messages must be a non-empty array." }, 400);
  }

  // Whitelist roles and cap sizes — this endpoint is public.
  const history: ChatMessage[] = [];
  for (const entry of body.messages as unknown[]) {
    const m = entry as { role?: unknown; content?: unknown };
    if (
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0
    ) {
      history.push({
        role: m.role,
        content: m.content.slice(0, MAX_MESSAGE_CHARS),
      });
    }
  }
  if (history.length === 0) {
    return json({ error: "No valid messages." }, 400);
  }

  const recent = history.slice(-MAX_HISTORY_MESSAGES);
  const latest = recent[recent.length - 1];
  if (latest.role !== "user") {
    return json({ error: "The last message must be from the user." }, 400);
  }

  const session = await ensureSession(sessionId, page);

  // Always record what the visitor said, whoever is answering.
  await appendMessages(sessionId, [{ role: "user", content: latest.content }]);

  // A counsellor has taken this conversation over: stay quiet and let the
  // widget poll for their reply instead of talking over them.
  if (session && !session.agent_enabled) {
    return json({ content: null, handedOver: true }, 200);
  }

  const conversation: OpenAiMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...recent,
  ];

  try {
    let message = await callOpenAi(apiKey, conversation);

    // One round of tool use is all save_lead needs: model asks for the tool,
    // we run it, model turns the result into a reply.
    if (message?.tool_calls?.length) {
      conversation.push({
        role: "assistant",
        content: message.content ?? null,
        tool_calls: message.tool_calls,
      });

      for (const toolCall of message.tool_calls) {
        const result =
          toolCall.function.name === "save_lead"
            ? await executeSaveLead(toolCall.function.arguments, sessionId)
            : JSON.stringify({ success: false, error: "Unknown tool." });

        conversation.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: result,
        });
      }

      message = await callOpenAi(apiKey, conversation);
    }

    const content = message?.content?.trim() || FALLBACK_REPLY;

    await appendMessages(sessionId, [{ role: "assistant", content }]);

    return json({ content }, 200);
  } catch (error) {
    console.error("[api/chat] completion failed:", error);
    return json({ content: FALLBACK_REPLY }, 200);
  }
}

export function GET() {
  return json({ error: "Use POST." }, 405);
}
