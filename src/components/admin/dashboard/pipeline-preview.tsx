import { SquareKanban } from "lucide-react";
import { Badge, EmptyState, Panel, PanelHeader } from "@/components/admin/ui";
import { ActionLink, ViewAllLink } from "./links";
import { formatAud } from "./format";
import type { CrmSummary } from "./types";

export function PipelinePreview({ summary }: { summary: CrmSummary }) {
  const settled = summary.won + summary.lost;
  const hasLeads = summary.open + settled > 0;

  // Bars are scaled against the busiest stage, so the shape of the board is
  // readable even when every stage holds only a handful of cards.
  const peak = Math.max(1, ...summary.stages.map((stage) => stage.openLeads));

  return (
    <Panel className="flex flex-col">
      <PanelHeader
        title="CRM pipeline"
        description="Open leads by stage"
        action={<ViewAllLink href="/admin/crm" />}
      />

      {!hasLeads ? (
        <EmptyState
          icon={<SquareKanban className="h-5 w-5" />}
          title="No leads on the board yet"
          description="Promote an inquiry and it drops straight into the first stage of your pipeline."
          action={
            <ActionLink href="/admin/inquiries">Browse inquiries</ActionLink>
          }
        />
      ) : (
        <>
          <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Open pipeline value
            </span>
            <span className="text-xl font-black tracking-tight text-slate-900">
              {formatAud(summary.openValue)}
            </span>
          </div>

          <ul className="px-5 py-3">
            {summary.stages.map((stage) => (
              <li key={stage.id} className="py-2">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-700">
                    {stage.name}
                  </span>
                  <span className="shrink-0 text-sm font-black tabular-nums text-slate-900">
                    {stage.openLeads}
                  </span>
                </div>
                <div
                  aria-hidden
                  className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
                >
                  <div
                    className="h-full rounded-full transition-[width]"
                    style={{
                      width: `${(stage.openLeads / peak) * 100}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-200 px-5 py-3">
            <Badge tone="blue">{summary.open} open</Badge>
            <Badge tone="green">{summary.won} won</Badge>
            <Badge tone="red">{summary.lost} lost</Badge>
          </div>
        </>
      )}
    </Panel>
  );
}
