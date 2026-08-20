"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Headset, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AEC Assist — the floating AI counsellor, bottom-right on every public page.
 *
 * Talks to POST /api/chat with { messages, sessionId }. The session id groups
 * one visitor's transcript in `ai_chat_messages` and is stamped onto any CRM
 * lead the agent saves, so a counsellor can read the conversation behind a card.
 */

type Message = {
  role: "user" | "assistant" | "admin";
  content: string;
  authorName?: string | null;
};

const GREETING: Message = {
  role: "assistant",
  content:
    "Ayubowan! 👋 I'm the **AI agent for Australian Education Centre**. Ask me anything about studying in Australia or 20+ other destinations — courses, costs, visas, scholarships, or bringing your family along.",
};

const SESSION_KEY = "aec-assist-session";

const SUGGESTIONS = [
  "What can I study in Australia?",
  "How do PR pathways work?",
  "What does it cost to study abroad?",
];

/**
 * Minimal markdown for chat bubbles: **bold**, "- " bullets and paragraph
 * breaks — everything the system prompt permits the model to emit. Building
 * React nodes (never HTML strings) keeps model output inert by construction.
 */
function renderInline(text: string, keyBase: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={`${keyBase}-${i}`}>{part}</strong> : part
  );
}

function ChatMarkdown({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/);

  return (
    <div className="space-y-2">
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n");
        const isList = lines.every((line) => /^\s*[-•]\s+/.test(line));

        if (isList) {
          return (
            <ul key={blockIndex} className="ml-4 list-disc space-y-1">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>
                  {renderInline(
                    line.replace(/^\s*[-•]\s+/, ""),
                    `${blockIndex}-${lineIndex}`
                  )}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={blockIndex} className="whitespace-pre-wrap">
            {renderInline(block, `${blockIndex}`)}
          </p>
        );
      })}
    </div>
  );
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // True once a counsellor has paused the AI and taken this conversation over.
  const [handedOver, setHandedOver] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * The conversation id, persisted for the browser tab.
   *
   * Kept in sessionStorage rather than only in memory: if a counsellor has
   * taken the chat over and the visitor reloads or navigates, a fresh id would
   * strand that counsellor in a conversation nobody is reading any more. A ref
   * (not state) because it is never rendered, so hydration cannot disagree.
   */
  const sessionIdRef = useRef("");
  function getSessionId() {
    if (sessionIdRef.current) return sessionIdRef.current;

    try {
      const stored = window.sessionStorage.getItem(SESSION_KEY);
      if (stored && /^[\w-]{8,64}$/.test(stored)) {
        sessionIdRef.current = stored;
        return stored;
      }
    } catch {
      // Private browsing can refuse storage; an in-memory id still works.
    }

    const fresh = crypto.randomUUID();
    sessionIdRef.current = fresh;
    try {
      window.sessionStorage.setItem(SESSION_KEY, fresh);
    } catch {
      // Same as above — not worth surfacing.
    }
    return fresh;
  }

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Watermark for the poll: only messages newer than this are fetched, so a
  // long conversation costs the same as a short one to keep up to date.
  const lastSeenRef = useRef<string | null>(null);

  /**
   * Poll for counsellor replies while the panel is open.
   *
   * Only runs once the visitor has actually said something (a session exists
   * server-side), and backs off to a slow beat until a human is involved —
   * an idle browser tab should not hammer the endpoint.
   */
  // False until the first successful poll of this mount, which is what tells
  // the poller to restore the transcript instead of appending to it.
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    async function poll() {
      try {
        const params = new URLSearchParams({ sessionId: getSessionId() });
        if (lastSeenRef.current) params.set("after", lastSeenRef.current);

        const response = await fetch(`/api/chat/messages?${params}`);
        if (!response.ok || cancelled) return;

        const data = (await response.json()) as {
          messages: {
            id: string;
            role: Message["role"];
            content: string;
            authorName: string | null;
            createdAt: string;
          }[];
          handedOver: boolean;
        };
        if (cancelled) return;

        setHandedOver(data.handedOver);

        if (data.messages.length > 0) {
          lastSeenRef.current =
            data.messages[data.messages.length - 1].createdAt;
        }

        if (!syncedRef.current) {
          // First sync of this mount. Anything on the server is history the
          // visitor already saw in a previous tab or before a reload, so it
          // replaces the local list rather than being appended to it.
          syncedRef.current = true;
          if (data.messages.length > 0) {
            setMessages([
              GREETING,
              ...data.messages.map((m) => ({
                role: m.role,
                content: m.content,
                authorName: m.authorName,
              })),
            ]);
          }
          return;
        }

        // Afterwards only counsellor messages are adopted: the visitor's own
        // and the agent's are already on screen from the send() round-trip.
        const fromCounsellor = data.messages.filter((m) => m.role === "admin");

        if (fromCounsellor.length > 0) {
          setMessages((current) => [
            ...current,
            ...fromCounsellor.map((m) => ({
              role: m.role,
              content: m.content,
              authorName: m.authorName,
            })),
          ]);
        }
      } catch {
        // A dropped poll is not worth surfacing; the next tick retries.
      }
    }

    void poll();
    const interval = window.setInterval(poll, handedOver ? 4_000 : 12_000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [isOpen, handedOver, messages.length]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is client-side furniture, not conversation.
        body: JSON.stringify({
          messages: nextMessages.slice(1),
          sessionId: getSessionId(),
          page: window.location.pathname,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = (await response.json()) as {
        content?: string | null;
        handedOver?: boolean;
      };

      // A counsellor owns this conversation: there is no AI reply to show, and
      // the poll will bring their answer through instead.
      if (data.handedOver) {
        setHandedOver(true);
        return;
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.content ??
            "Sorry — something went wrong. Please try again, or call us on **+94 77 395 0448**.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Sorry — I couldn't reach our servers just now. Please try again in a moment, or call us on **+94 77 395 0448**.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* --- Launcher ------------------------------------------------- */}
      <div className="fixed bottom-5 right-5 z-[60] md:bottom-6 md:right-6">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="launcher"
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Chat with AEC Assist"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-900 bg-[#124b8d] text-white shadow-[4px_4px_0px_rgba(15,23,42,1)]"
            >
              {/* The pulse: a ring that breathes out and fades, on repeat. */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-[#124b8d]"
                animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.045, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="absolute inset-0 rounded-full bg-[#124b8d]" />
              </motion.span>
              <MessageCircle className="relative z-10 h-6 w-6" />
              <span className="absolute -right-1 -top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full border border-slate-900 bg-[#e31b23]">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* --- Panel ---------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-0 right-0 z-[70] flex h-[100dvh] w-full flex-col overflow-hidden bg-white text-slate-900 shadow-2xl sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-3rem)] sm:w-[380px] sm:rounded-[1.75rem] sm:border-2 sm:border-slate-900"
            role="dialog"
            aria-label="AEC Assist chat"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b-2 border-slate-900 bg-[#124b8d] px-4 py-3.5 text-white">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#124b8d] bg-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black leading-tight">
                  {handedOver ? "AEC Counsellor" : "AEC Assist"}
                </p>
                <p className="truncate text-[11px] font-medium text-blue-100">
                  {handedOver
                    ? "You're chatting with our team"
                    : "AI agent for Australian Education Centre"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/15"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
            >
              {handedOver && (
                <div className="flex items-center gap-2 rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-800">
                  <Headset className="h-3.5 w-3.5 shrink-0" />
                  A counsellor from AEC has joined this chat.
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                      message.role === "user" &&
                        "rounded-br-md bg-[#124b8d] text-white",
                      message.role === "assistant" &&
                        "rounded-bl-md border border-slate-200 bg-white text-slate-700",
                      message.role === "admin" &&
                        "rounded-bl-md border-2 border-emerald-200 bg-emerald-50 text-slate-800"
                    )}
                  >
                    {message.role === "admin" && (
                      <p className="mb-1 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                        <Headset className="h-3 w-3" />
                        {message.authorName ?? "AEC Counsellor"}
                      </p>
                    )}
                    <ChatMarkdown content={message.content} />
                  </div>
                </div>
              ))}

              {/* First-visit suggestion chips */}
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-[#124b8d] hover:text-[#124b8d]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-slate-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: dot * 0.18,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void send(input);
              }}
              className="border-t border-slate-200 bg-white p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={
                  handedOver ? "Message the counsellor…" : "Type your question…"
                }
                  maxLength={2000}
                  disabled={isLoading}
                  className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-[#124b8d] focus:outline-none focus:ring-2 focus:ring-[#124b8d]/20 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#124b8d] text-white transition-colors hover:bg-[#0e3c72] disabled:opacity-40"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-slate-400">
                Powered by{" "}
                <a
                  href="https://www.arcai.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#124b8d] hover:underline"
                >
                  ARC AI
                </a>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
