"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Bot, Headset, Loader2, Send, UserRound } from "lucide-react";
import { AdminButton, FormMessage, inputClass } from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { ChatRole } from "@/lib/supabase/database.types";
import { sendReplyAction, type ReplyState } from "./actions";

/**
 * The transcript pane in the back office.
 *
 * Server-rendered messages arrive as props; this component keeps the view live
 * by re-fetching the route every few seconds while the conversation is open.
 * Polling rather than Supabase Realtime keeps the deployment free of websocket
 * configuration, and a counsellor reading a chat is a short-lived activity.
 */

export type TranscriptMessage = {
  id: string;
  role: ChatRole;
  content: string;
  authorName: string | null;
  createdAt: string;
};

const INITIAL_STATE: ReplyState = { status: "idle" };

function time(value: string) {
  return new Date(value).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SendButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" disabled={pending || disabled}>
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Send className="h-4 w-4" />
      )}
      {pending ? "Sending…" : "Send"}
    </AdminButton>
  );
}

export function Conversation({
  sessionId,
  messages,
  agentEnabled,
  isClosed,
}: {
  sessionId: string;
  messages: TranscriptMessage[];
  agentEnabled: boolean;
  isClosed: boolean;
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [state, formAction] = useActionState(sendReplyAction, INITIAL_STATE);

  const scrollRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Refresh the server component so new visitor messages appear. Paused on
  // archived conversations, which by definition are not moving.
  useEffect(() => {
    if (isClosed) return;

    const interval = window.setInterval(() => router.refresh(), 5_000);
    return () => window.clearInterval(interval);
  }, [router, isClosed]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  // React 19 resets a form once its action settles. Adjusting state during
  // render — React's documented pattern for reacting to a changed value — is
  // what keeps the controlled textarea in step with that reset without the
  // extra render an effect would cost.
  const [lastState, setLastState] = useState(state);
  if (lastState !== state) {
    setLastState(state);
    if (state.status === "idle") setBody("");
  }

  return (
    <div className="flex h-[calc(100vh-19rem)] min-h-[420px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4"
      >
        {messages.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">
            No messages in this conversation yet.
          </p>
        ) : (
          messages.map((message) => {
            const isVisitor = message.role === "user";

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2.5",
                  isVisitor ? "justify-start" : "justify-end"
                )}
              >
                {isVisitor && (
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                    <UserRound className="h-3.5 w-3.5" />
                  </span>
                )}

                <div className="max-w-[75%]">
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap",
                      isVisitor &&
                        "rounded-tl-md border border-slate-200 bg-white text-slate-700",
                      message.role === "assistant" &&
                        "rounded-tr-md bg-[#124b8d] text-white",
                      message.role === "admin" &&
                        "rounded-tr-md border-2 border-emerald-300 bg-emerald-50 text-slate-800"
                    )}
                  >
                    {message.content}
                  </div>

                  <p
                    className={cn(
                      "mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400",
                      isVisitor ? "justify-start" : "justify-end"
                    )}
                  >
                    {message.role === "assistant" && (
                      <>
                        <Bot className="h-3 w-3" />
                        AEC Assist
                      </>
                    )}
                    {message.role === "admin" && (
                      <>
                        <Headset className="h-3 w-3" />
                        {message.authorName ?? "Counsellor"}
                      </>
                    )}
                    {isVisitor && "Visitor"}
                    <span className="font-medium normal-case">
                      · {time(message.createdAt)}
                    </span>
                  </p>
                </div>

                {!isVisitor && (
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      message.role === "admin"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-[#124b8d]"
                    )}
                  >
                    {message.role === "admin" ? (
                      <Headset className="h-3.5 w-3.5" />
                    ) : (
                      <Bot className="h-3.5 w-3.5" />
                    )}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      <form
        ref={formRef}
        action={formAction}
        className="shrink-0 border-t border-slate-200 bg-white p-3"
      >
        <input type="hidden" name="session_id" value={sessionId} />

        {state.status === "error" && state.message && (
          <div className="mb-2">
            <FormMessage status="error">{state.message}</FormMessage>
          </div>
        )}

        {agentEnabled && (
          <p className="mb-2 rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-700">
            AEC Assist is still answering this chat. Sending a reply pauses it
            and hands the conversation to you.
          </p>
        )}

        <div className="flex items-end gap-2">
          <textarea
            name="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            onKeyDown={(event) => {
              // Enter sends, Shift+Enter makes a new line — what every chat
              // tool does, and what a counsellor will reach for by reflex.
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                if (body.trim()) formRef.current?.requestSubmit();
              }
            }}
            rows={2}
            maxLength={4000}
            disabled={isClosed}
            placeholder={
              isClosed
                ? "This conversation is archived."
                : "Write a reply to the visitor…"
            }
            className={`${inputClass} resize-none`}
          />
          <SendButton disabled={isClosed || !body.trim()} />
        </div>
      </form>
    </div>
  );
}
