import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Archive,
  ArchiveRestore,
  Bot,
  Headset,
  Phone,
  SquareKanban,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  AdminButton,
  Badge,
  PageHeader,
  Panel,
  PanelHeader,
  formatDateTime,
} from "@/components/admin/ui";
import { Conversation, type TranscriptMessage } from "../conversation";
import {
  markReadAction,
  toggleAgentAction,
  toggleStatusAction,
} from "../actions";

export const metadata = {
  title: "Conversation | AEC Back Office",
};

// A live transcript; caching it would show a counsellor stale messages.
export const dynamic = "force-dynamic";

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  const supabase = await createClient();

  const { data: session } = await supabase
    .from("ai_chat_sessions")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (!session) notFound();

  const { data: rows } = await supabase
    .from("ai_chat_messages")
    .select("id, role, content, author_name, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(500);

  const messages: TranscriptMessage[] = (rows ?? []).map((row) => ({
    id: row.id,
    role: row.role,
    content: row.content,
    authorName: row.author_name,
    createdAt: row.created_at,
  }));

  const isClosed = session.status === "closed";

  return (
    <div className="space-y-6">
      <PageHeader
        title={session.visitor_name ?? "Anonymous visitor"}
        description={[
          session.visitor_phone,
          `${session.message_count} message${session.message_count === 1 ? "" : "s"}`,
          session.first_page ? `started on ${session.first_page}` : null,
          `last activity ${formatDateTime(session.last_message_at)}`,
        ]
          .filter(Boolean)
          .join(" · ")}
        action={
          <Link href="/admin/chats">
            <AdminButton variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              All chats
            </AdminButton>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Conversation
            sessionId={session.session_id}
            messages={messages}
            agentEnabled={session.agent_enabled}
            isClosed={isClosed}
          />
        </div>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title="Who is answering" />
            <div className="space-y-3 p-5">
              <div className="flex items-center gap-2">
                {session.agent_enabled ? (
                  <>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#124b8d]">
                      <Bot className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-black text-slate-900">
                        AEC Assist
                      </p>
                      <p className="text-[11px] text-slate-400">
                        The AI is replying automatically.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <Headset className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-black text-slate-900">
                        Your team
                      </p>
                      <p className="text-[11px] text-slate-400">
                        The AI is paused on this chat.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <form action={toggleAgentAction}>
                <input type="hidden" name="session_id" value={session.session_id} />
                <AdminButton
                  type="submit"
                  variant={session.agent_enabled ? "primary" : "secondary"}
                  className="w-full"
                >
                  {session.agent_enabled ? (
                    <>
                      <Headset className="h-4 w-4" />
                      Take over this chat
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4" />
                      Hand back to AEC Assist
                    </>
                  )}
                </AdminButton>
              </form>

              <p className="text-[11px] leading-relaxed text-slate-400">
                {session.agent_enabled
                  ? "Taking over pauses the AI and tells the visitor a counsellor has joined."
                  : "Handing back lets the AI answer again from the next message."}
              </p>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Visitor" />
            <div className="space-y-3 p-5 text-sm">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Name
                </p>
                <p className="font-bold text-slate-900">
                  {session.visitor_name ?? "Not shared yet"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Phone
                </p>
                {session.visitor_phone ? (
                  <a
                    href={`tel:${session.visitor_phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[#124b8d] hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {session.visitor_phone}
                  </a>
                ) : (
                  <p className="font-bold text-slate-400">Not shared yet</p>
                )}
              </div>

              {session.lead_id && (
                <Link href="/admin/crm">
                  <Badge tone="violet">
                    <SquareKanban className="h-3 w-3" />
                    On the CRM board
                  </Badge>
                </Link>
              )}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Housekeeping" />
            <div className="space-y-2 p-5">
              <form action={markReadAction}>
                <input type="hidden" name="session_id" value={session.session_id} />
                <AdminButton type="submit" variant="ghost" size="sm" className="w-full">
                  Mark as read
                </AdminButton>
              </form>

              <form action={toggleStatusAction}>
                <input type="hidden" name="session_id" value={session.session_id} />
                <AdminButton type="submit" variant="ghost" size="sm" className="w-full">
                  {isClosed ? (
                    <>
                      <ArchiveRestore className="h-3.5 w-3.5" />
                      Reopen
                    </>
                  ) : (
                    <>
                      <Archive className="h-3.5 w-3.5" />
                      Archive
                    </>
                  )}
                </AdminButton>
              </form>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
