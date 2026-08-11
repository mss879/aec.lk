"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, GripVertical } from "lucide-react";
import { Badge, RelativeTime } from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/supabase/database.types";
import {
  PRIORITY_META,
  SOURCE_META,
  STATUS_META,
  formatMoney,
} from "./board-utils";

type LeadCardProps = {
  lead: Lead;
  onOpen?: (leadId: string) => void;
  /** Rendered inside the DragOverlay — lifted, and never interactive. */
  overlay?: boolean;
};

export function LeadCard({ lead, onOpen, overlay = false }: LeadCardProps) {
  const priority = PRIORITY_META[lead.priority];
  const source = SOURCE_META[lead.source_type];
  const status = STATUS_META[lead.status];

  return (
    <div
      className={cn(
        "group/card rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-shadow",
        overlay
          ? "rotate-2 cursor-grabbing shadow-lg ring-2 ring-blue-500/30"
          : "cursor-grab hover:border-slate-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-2">
        <span
          aria-hidden
          className="mt-1 text-slate-300 transition-colors group-hover/card:text-slate-400"
        >
          <GripVertical className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden
              className={cn(
                "h-2 w-2 shrink-0 rounded-full",
                priority.dotClass
              )}
            />
            <p className="truncate text-sm font-bold text-slate-900">
              {lead.full_name}
            </p>
            <span className="sr-only">{priority.label}.</span>
          </div>

          {lead.interest && (
            <p className="mt-0.5 truncate text-xs text-slate-500">
              {lead.interest}
            </p>
          )}
        </div>

        {onOpen && (
          <button
            type="button"
            aria-label={`Open ${lead.full_name}`}
            // Stop the pointer sensor claiming this press as the start of a drag.
            onPointerDown={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onOpen(lead.id);
            }}
            className="-mr-1 -mt-1 shrink-0 rounded-lg p-1 text-slate-300 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pl-6">
        <Badge tone={source.tone}>{source.label}</Badge>
        {lead.status !== "open" && (
          <Badge tone={status.tone}>{status.label}</Badge>
        )}
        {lead.value !== null && (
          <span className="text-[11px] font-bold tabular-nums text-slate-700">
            {formatMoney(lead.value, lead.currency)}
          </span>
        )}
        <RelativeTime
          value={lead.created_at}
          className="ml-auto text-[11px] text-slate-400"
        />
      </div>
    </div>
  );
}

export function SortableLeadCard({
  lead,
  onOpen,
}: {
  lead: Lead;
  onOpen: (leadId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lead.id,
    data: { type: "lead", stageId: lead.stage_id },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      // The whole card is the drag handle, so a card can be grabbed anywhere.
      // The pointer sensor's 6px activation distance keeps a plain click free
      // for opening the detail drawer.
      {...attributes}
      {...listeners}
      onClick={() => onOpen(lead.id)}
      className={cn(
        "touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50",
        // The DragOverlay renders the card that follows the cursor; this one
        // stays behind as the gap it will drop into.
        isDragging && "opacity-40"
      )}
    >
      <LeadCard lead={lead} onOpen={onOpen} />
    </div>
  );
}
