import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, SquareKanban } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  INQUIRY_STATUSES,
  SOURCE_TYPE_META,
  describeSource,
  inquiryStatusMeta,
  resolveFormSource,
} from "@/lib/inquiries";
import type { Inquiry } from "@/lib/supabase/database.types";
import {
  Badge,
  Panel,
  PanelHeader,
  PageHeader,
  formatDateTime,
  formatRelative,
} from "@/components/admin/ui";
import {
  DeleteForm,
  NotesForm,
  PromoteForm,
  StatusForm,
} from "./inquiry-forms";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="min-w-0 break-words text-sm text-slate-800">{children}</dd>
    </div>
  );
}

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // A malformed id would make Postgres reject the query outright; treating it
  // as "not found" is both truer and quieter.
  if (!UUID_PATTERN.test(id)) notFound();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[admin/inquiries] detail query failed", error);
  }

  if (!data) notFound();

  const inquiry = data as Inquiry;
  const status = inquiryStatusMeta(inquiry.status);
  const sourceMeta = SOURCE_TYPE_META[inquiry.source_type];
  const fullName =
    [inquiry.first_name, inquiry.last_name].filter(Boolean).join(" ") ||
    inquiry.email;

  // Already promoted? Point at the card instead of offering to make another.
  const { data: lead } = inquiry.converted_lead_id
    ? await supabase
        .from("leads")
        .select("id, full_name")
        .eq("id", inquiry.converted_lead_id)
        .maybeSingle()
    : { data: null };

  const metadata =
    inquiry.metadata &&
    typeof inquiry.metadata === "object" &&
    !Array.isArray(inquiry.metadata)
      ? inquiry.metadata
      : null;
  const hasMetadata = metadata ? Object.keys(metadata).length > 0 : false;

  const formMeta = resolveFormSource(inquiry.source_form);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/inquiries"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All inquiries
      </Link>

      <PageHeader
        title={fullName}
        description={`${describeSource(inquiry)} · received ${formatRelative(
          inquiry.created_at
        )}`}
        action={<Badge tone={status.tone}>{status.label}</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel>
            <PanelHeader title="Submission" />
            <dl className="divide-y divide-slate-100">
              <DetailRow label="Name">{fullName}</DetailRow>
              <DetailRow label="Email">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {inquiry.email}
                </a>
              </DetailRow>
              <DetailRow label="Phone">
                {inquiry.phone ? (
                  <a
                    href={`tel:${inquiry.phone.replace(/\s+/g, "")}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {inquiry.phone}
                  </a>
                ) : (
                  "—"
                )}
              </DetailRow>
              <DetailRow label="Interest">{inquiry.interest ?? "—"}</DetailRow>
              <DetailRow label="Message">
                {inquiry.message ? (
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {inquiry.message}
                  </p>
                ) : (
                  "—"
                )}
              </DetailRow>
              <DetailRow label="Received">
                {formatDateTime(inquiry.created_at)}
              </DetailRow>
              <DetailRow label="Last updated">
                {formatDateTime(inquiry.updated_at)}
              </DetailRow>
            </dl>
          </Panel>

          <Panel>
            <PanelHeader
              title="Where this came from"
              description={sourceMeta?.description}
              action={
                <Badge tone={sourceMeta?.tone ?? "slate"}>
                  {sourceMeta?.label ?? inquiry.source_type}
                </Badge>
              }
            />
            <dl className="divide-y divide-slate-100">
              <DetailRow label="Form">
                {inquiry.source_label ?? formMeta?.label ?? "—"}
              </DetailRow>
              <DetailRow label="Form key">
                {inquiry.source_form ? (
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                    {inquiry.source_form}
                  </code>
                ) : (
                  "—"
                )}
              </DetailRow>
              <DetailRow label="Page">
                {inquiry.source_page ?? formMeta?.page ?? "—"}
              </DetailRow>
              <DetailRow label="Agent">{inquiry.agent_name ?? "—"}</DetailRow>
              <DetailRow label="Metadata">
                {hasMetadata ? (
                  <pre className="overflow-x-auto rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                    {JSON.stringify(metadata, null, 2)}
                  </pre>
                ) : (
                  "—"
                )}
              </DetailRow>
            </dl>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel>
            <PanelHeader
              title="Move to CRM"
              description="Creates a lead card in the default pipeline stage."
            />
            <div className="p-5">
              {lead ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">
                    This inquiry is already in the pipeline as{" "}
                    <span className="font-bold text-slate-900">
                      {lead.full_name}
                    </span>
                    .
                  </p>
                  <Link
                    href="/admin/crm"
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <SquareKanban className="h-4 w-4" />
                    Open the CRM
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600">
                    Promote this inquiry into a lead card. The inquiry stays here
                    and is marked as converted.
                  </p>
                  <PromoteForm id={inquiry.id} />
                </div>
              )}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Handling" />
            <div className="space-y-6 p-5">
              <StatusForm
                id={inquiry.id}
                current={inquiry.status}
                statuses={INQUIRY_STATUSES.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />
              <NotesForm id={inquiry.id} notes={inquiry.admin_notes} />
            </div>
          </Panel>

          <Panel className="border-red-100">
            <PanelHeader
              title="Danger zone"
              description="Deleting removes the submission permanently. Archive it instead if you might want it later."
            />
            <div className="p-5">
              <DeleteForm id={inquiry.id} name={fullName} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
