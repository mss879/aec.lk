import Link from "next/link";
import {
  Bot,
  Headset,
  MessageSquare,
  Phone,
  SquareKanban,
  UserRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  Badge,
  EmptyState,
  PageHeader,
  Panel,
  formatRelative,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "AI Chats | AEC Back Office",
};

// The inbox is a live view; a cached one would show stale conversations.
export const dynamic = "force-dynamic";

type Filter = "open" | "human" | "unread" | "closed" | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "unread", label: "Unread" },
  { value: "human", label: "With a counsellor" },
  { value: "closed", label: "Archived" },
  { value: "all", label: "All" },
];

function readFilter(value: string | string[] | undefined): Filter {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "human" ||
    raw === "unread" ||
    raw === "closed" ||
    raw === "all"
    ? raw
    : "open";
}

export default async function ChatsInboxPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string | string[] }>;
}) {
  const filter = readFilter((await searchParams).view);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ai_chat_sessions")
    .select(
      "id, session_id, status, agent_enabled, visitor_name, visitor_phone, lead_id, first_page, message_count, last_message_at, admin_read_at"
    )
    .order("last_message_at", { ascending: false })
    .limit(200);

  // Falling back to [] silently would render an unreachable database as "no
  // conversations", which reads as data loss rather than a connection problem.
  const listFailed = Boolean(error);
  if (error) {
    console.error("[admin/chats] failed to load sessions:", error.message);
  }

  const sessions = data ?? [];

  const isUnread = (session: (typeof sessions)[number]) =>
    !session.admin_read_at ||
    new Date(session.last_message_at) > new Date(session.admin_read_at);

  const matches = (session: (typeof sessions)[number], value: Filter) => {
    if (value === "all") return true;
    if (value === "closed") return session.status === "closed";
    if (value === "human") {
      return !session.agent_enabled && session.status === "open";
    }
    if (value === "unread") {
      return session.status === "open" && isUnread(session);
    }
    return session.status === "open";
  };

  const visible = sessions.filter((session) => matches(session, filter));

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Chats"
        description="Every conversation AEC Assist has had on the website. Open one to read it, or jump in and take over."
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <Link
            key={option.value}
            href={
              option.value === "open"
                ? "/admin/chats"
                : `/admin/chats?view=${option.value}`
            }
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors",
              filter === option.value
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {option.label}
            <span className="ml-1.5 opacity-60">
              {sessions.filter((s) => matches(s, option.value)).length}
            </span>
          </Link>
        ))}
      </div>

      {listFailed ? (
        <Panel>
          <div className="p-6 text-sm font-medium text-red-600">
            The conversations could not be loaded. This is a connection problem,
            not an empty inbox — nothing has been deleted. Refresh to try again.
          </div>
        </Panel>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="h-5 w-5" />}
          title={
            filter === "open" ? "No conversations yet" : "Nothing in this view"
          }
          description="Chats appear here the moment a visitor sends their first message to AEC Assist on the website."
        />
      ) : (
        <Panel>
          <ul className="divide-y divide-slate-100">
            {visible.map((session) => {
              const unread = isUnread(session);

              return (
                <li key={session.id}>
                  <Link
                    href={`/admin/chats/${session.session_id}`}
                    className="flex flex-col gap-3 p-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center"
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        session.agent_enabled
                          ? "bg-blue-50 text-[#124b8d]"
                          : "bg-emerald-50 text-emerald-700"
                      )}
                    >
                      {session.agent_enabled ? (
                        <Bot className="h-5 w-5" />
                      ) : (
                        <Headset className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "truncate text-sm",
                            unread
                              ? "font-black text-slate-900"
                              : "font-bold text-slate-700"
                          )}
                        >
                          {session.visitor_name ?? "Anonymous visitor"}
                        </span>

                        {unread && session.status === "open" && (
                          <Badge tone="blue">New</Badge>
                        )}
                        {!session.agent_enabled && (
                          <Badge tone="green">Counsellor</Badge>
                        )}
                        {session.status === "closed" && (
                          <Badge tone="slate">Archived</Badge>
                        )}
                        {session.lead_id && (
                          <Badge tone="violet">
                            <SquareKanban className="h-3 w-3" />
                            In CRM
                          </Badge>
                        )}
                      </div>

                      <p className="mt-0.5 truncate text-[11px] text-slate-400">
                        {[
                          session.visitor_phone,
                          `${session.message_count} message${session.message_count === 1 ? "" : "s"}`,
                          session.first_page ? `from ${session.first_page}` : null,
                          formatRelative(session.last_message_at),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 text-slate-300">
                      {session.visitor_phone ? (
                        <Phone className="h-4 w-4" />
                      ) : (
                        <UserRound className="h-4 w-4" />
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>
      )}
    </div>
  );
}
