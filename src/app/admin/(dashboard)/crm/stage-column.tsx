"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Lock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lead, PipelineStage } from "@/lib/supabase/database.types";
import { SortableLeadCard } from "./lead-card";
import { formatTotals, stageDroppableId } from "./board-utils";

export function StageColumn({
  stage,
  leads,
  onOpenLead,
  onAddLead,
}: {
  stage: PipelineStage;
  leads: Lead[];
  onOpenLead: (leadId: string) => void;
  onAddLead: (stageId: string) => void;
}) {
  // The COLUMN is the droppable, not just the card list — otherwise a card can
  // never be dropped into a column that has no cards to aim at.
  const { setNodeRef, isOver } = useDroppable({
    id: stageDroppableId(stage.id),
    data: { type: "stage", stageId: stage.id },
  });

  const totals = formatTotals(leads);

  return (
    <section
      aria-label={`${stage.name} stage`}
      // Capped so a long column scrolls inside itself rather than stretching
      // the whole board down the page.
      className="flex max-h-[calc(100vh-15rem)] w-[19rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <header
        className="border-t-4 border-b border-b-slate-200 px-4 py-3"
        style={{ borderTopColor: stage.color }}
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: stage.color }}
          />
          <h3 className="min-w-0 flex-1 truncate text-sm font-black tracking-tight text-slate-900">
            {stage.name}
          </h3>

          {stage.is_default && (
            <span
              title="Locked — every inquiry promoted from the Inquiries tab lands here, so this stage cannot be renamed or deleted."
              className="shrink-0 text-slate-400"
            >
              <Lock className="h-3.5 w-3.5" />
              <span className="sr-only">
                Locked default stage. Promoted inquiries land here, so it cannot
                be renamed or deleted.
              </span>
            </span>
          )}

          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold tabular-nums text-slate-600">
            {leads.length}
          </span>
        </div>

        <div className="mt-1 flex items-baseline justify-between gap-2 pl-4.5">
          {stage.description ? (
            <p className="min-w-0 truncate text-[11px] text-slate-400">
              {stage.description}
            </p>
          ) : (
            <span />
          )}
          {totals && (
            <span className="shrink-0 text-[11px] font-bold tabular-nums text-slate-700">
              {totals}
            </span>
          )}
        </div>
      </header>

      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[8rem] flex-1 flex-col gap-2 overflow-y-auto p-3 transition-colors",
          isOver ? "bg-blue-50/70" : "bg-slate-50/50"
        )}
      >
        <SortableContext
          items={leads.map((lead) => lead.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.map((lead) => (
            <SortableLeadCard key={lead.id} lead={lead} onOpen={onOpenLead} />
          ))}
        </SortableContext>

        {leads.length === 0 && (
          <div
            className={cn(
              "flex flex-1 items-center justify-center rounded-xl border border-dashed px-3 py-6 text-center text-[11px] transition-colors",
              isOver
                ? "border-blue-300 text-blue-600"
                : "border-slate-200 text-slate-400"
            )}
          >
            {isOver ? "Drop to move here" : "No leads in this stage"}
          </div>
        )}
      </div>

      <footer className="border-t border-slate-200 p-2">
        <button
          type="button"
          onClick={() => onAddLead(stage.id)}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        >
          <Plus className="h-3.5 w-3.5" />
          Add lead
        </button>
      </footer>
    </section>
  );
}
