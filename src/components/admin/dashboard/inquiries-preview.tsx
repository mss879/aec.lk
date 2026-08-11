import { Bot, Globe, Inbox } from "lucide-react";
import {
  Badge,
  EmptyState,
  Panel,
  PanelHeader,
  formatRelative,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { SourceType } from "@/lib/supabase/database.types";
import { ActionLink, ViewAllLink } from "./links";
import { fullName } from "./format";
import type {
  FormBreakdown,
  InquiriesSummary,
  RecentInquiry,
  SourceTypeCounts,
} from "./types";

/** Fixed order so the stacked bar reads the same way on every visit. */
const SOURCE_ORDER: SourceType[] = ["form", "ai_agent", "manual", "import"];

const sourceStyles: Record<SourceType, { swatch: string; label: string }> = {
  form: { swatch: "bg-blue-600", label: "Website forms" },
  ai_agent: { swatch: "bg-violet-500", label: "AI agent" },
  manual: { swatch: "bg-slate-400", label: "Added manually" },
  import: { swatch: "bg-amber-500", label: "Imported" },
};

function SourceBadge({ inquiry }: { inquiry: RecentInquiry }) {
  if (inquiry.source_type === "ai_agent") {
    return (
      <Badge tone="violet" className="max-w-full">
        <Bot className="h-3 w-3 shrink-0" />
        <span className="truncate">{inquiry.agent_name ?? "AI agent"}</span>
      </Badge>
    );
  }

  if (inquiry.source_type === "form") {
    return (
      <Badge tone="blue" className="max-w-full">
        <Globe className="h-3 w-3 shrink-0" />
        <span className="truncate">
          {inquiry.source_label ?? inquiry.source_form ?? "Website form"}
        </span>
      </Badge>
    );
  }

  return (
    <Badge tone="slate">
      {inquiry.source_type === "manual" ? "Added manually" : "Imported"}
    </Badge>
  );
}

function SourceBreakdown({
  counts,
  topForms,
}: {
  counts: SourceTypeCounts;
  topForms: FormBreakdown[];
}) {
  const total = SOURCE_ORDER.reduce((sum, type) => sum + counts[type], 0);
  const present = SOURCE_ORDER.filter((type) => counts[type] > 0);

  if (total === 0) return null;

  return (
    <div className="border-b border-slate-200 px-5 py-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        Where they came from
      </p>

      <div
        aria-hidden
        className="mt-2.5 flex h-2 w-full overflow-hidden rounded-full bg-slate-100"
      >
        {present.map((type) => (
          <div
            key={type}
            className={sourceStyles[type].swatch}
            style={{ width: `${(counts[type] / total) * 100}%` }}
          />
        ))}
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-5 gap-y-1.5">
        {present.map((type) => (
          <div key={type} className="flex items-center gap-2 text-xs">
            <span
              className={cn(
                "h-2 w-2 shrink-0 rounded-full",
                sourceStyles[type].swatch
              )}
            />
            <dt className="min-w-0 flex-1 truncate text-slate-500">
              {sourceStyles[type].label}
            </dt>
            <dd className="shrink-0 font-bold tabular-nums text-slate-900">
              {counts[type]}
            </dd>
          </div>
        ))}
      </dl>

      {topForms.length > 0 && (
        <div className="mt-4 border-t border-dashed border-slate-200 pt-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Busiest forms
          </p>
          <ul className="mt-2 space-y-1.5">
            {topForms.map((form) => (
              <li
                key={form.key}
                className="flex items-baseline justify-between gap-3 text-xs"
              >
                <span className="min-w-0 truncate text-slate-600">
                  {form.label}
                </span>
                <span className="shrink-0 font-bold tabular-nums text-slate-900">
                  {form.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function InquiriesPreview({ summary }: { summary: InquiriesSummary }) {
  return (
    <Panel className="flex flex-col">
      <PanelHeader
        title="Inquiries"
        description={
          summary.unread > 0
            ? `${summary.unread} waiting to be read`
            : "Everything caught up"
        }
        action={<ViewAllLink href="/admin/inquiries" />}
      />

      {summary.total === 0 ? (
        <EmptyState
          icon={<Inbox className="h-5 w-5" />}
          title="No inquiries yet"
          description="Website form submissions and AI-agent intakes land here on their own. Send a test through the public contact form to see it arrive."
          action={<ActionLink href="/contact">Open the contact form</ActionLink>}
        />
      ) : (
        <>
          <SourceBreakdown
            counts={summary.bySourceType}
            topForms={summary.topForms}
          />

          <ul className="divide-y divide-slate-100">
            {summary.recent.map((inquiry) => (
              <li
                key={inquiry.id}
                className="flex items-start justify-between gap-3 px-5 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {fullName(inquiry.first_name, inquiry.last_name)}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {inquiry.interest ?? "No stated interest"}
                  </p>
                  <div className="mt-1.5 flex">
                    <SourceBadge inquiry={inquiry} />
                  </div>
                </div>
                <span className="shrink-0 pt-0.5 text-xs text-slate-400">
                  {formatRelative(inquiry.created_at)}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Panel>
  );
}
