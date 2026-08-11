"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import Link from "next/link";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Inbox, Plus, Settings2, TriangleAlert, X } from "lucide-react";
import {
  AdminButton,
  EmptyState,
  PageHeader,
  Panel,
} from "@/components/admin/ui";
import type { Lead, PipelineStage } from "@/lib/supabase/database.types";
import { moveLeadAction } from "./actions";
import {
  countLeads,
  findLead,
  formatTotals,
  groupLeadsByStage,
  positionForIndex,
  resolveStageId,
  stageIdOfLead,
  type Board,
} from "./board-utils";
import { LeadCard } from "./lead-card";
import { LeadDrawer } from "./lead-drawer";
import { LeadFormModal } from "./lead-form-modal";
import { StageColumn } from "./stage-column";
import { StageManagerDrawer } from "./stage-manager";

export function PipelineBoard({
  stages,
  leads,
}: {
  stages: PipelineStage[];
  leads: Lead[];
}) {
  /* --- Board state ------------------------------------------------------
   * The board is a local, optimistically-mutated copy of the server data. All
   * writes go through `commitBoard` so `boardRef` is always up to date *during*
   * a drag — dnd-kit fires dragover and dragend faster than a state closure
   * would refresh.
   * ------------------------------------------------------------------- */
  const [board, setBoard] = useState<Board>(() =>
    groupLeadsByStage(stages, leads)
  );
  const boardRef = useRef(board);

  const commitBoard = useCallback((next: Board) => {
    boardRef.current = next;
    setBoard(next);
  }, []);

  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const rollbackRef = useRef<Board | null>(null);
  const [moveError, setMoveError] = useState<string | null>(null);
  const [isMoving, startMove] = useTransition();

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  // Visibility is its own flag rather than "is there a stage id?" — a board with
  // no stages yet has no id to preselect, and the modal has to open anyway to
  // explain why a lead cannot be added.
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [addLeadStageId, setAddLeadStageId] = useState<string | null>(null);
  const [addLeadKey, setAddLeadKey] = useState(0);
  const [stageManagerOpen, setStageManagerOpen] = useState(false);

  /* --- Re-sync from the server ------------------------------------------
   * Every action calls `revalidatePath('/admin/crm')`, so fresh props arrive
   * after each mutation. Adopt them — but never mid-flight, or an in-progress
   * optimistic drag would be stamped out by data that predates it. The
   * transition stays pending until the revalidated render commits, so waiting
   * on `isMoving` is enough.
   * ------------------------------------------------------------------- */
  const serverSignature = useMemo(
    () =>
      [
        stages.map((s) => `${s.id}~${s.position}~${s.name}~${s.color}`).join("|"),
        leads
          .map((l) => `${l.id}~${l.stage_id}~${l.position}~${l.updated_at}`)
          .join("|"),
      ].join("#"),
    [stages, leads]
  );
  const appliedSignatureRef = useRef(serverSignature);

  useEffect(() => {
    if (isMoving) return;
    if (appliedSignatureRef.current === serverSignature) return;
    appliedSignatureRef.current = serverSignature;
    commitBoard(groupLeadsByStage(stages, leads));
  }, [serverSignature, isMoving, stages, leads, commitBoard]);

  /* --- Sensors ---------------------------------------------------------- */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Without an activation distance, a plain click on a card would be
      // swallowed by the drag and the detail drawer would never open.
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /* --- Drag handling ---------------------------------------------------- */

  function handleDragStart(event: DragStartEvent) {
    const lead = findLead(boardRef.current, String(event.active.id));
    if (!lead) return;
    rollbackRef.current = boardRef.current;
    setActiveLead(lead);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const current = boardRef.current;
    const fromStageId = stageIdOfLead(current, activeId);
    const toStageId = resolveStageId(current, overId);
    if (!fromStageId || !toStageId) return;

    const source = current[fromStageId];
    const activeIndex = source.findIndex((lead) => lead.id === activeId);
    if (activeIndex === -1) return;

    /* Reordering inside one column.
     *
     * This has to be previewed here rather than settled on drop. `handleDragEnd`
     * sees a board the cross-column branch below has already rearranged, so
     * re-deriving the move from `over` at that point double-counts it and the
     * card lands one slot past where the placeholder showed it. Keeping the
     * board authoritative during the drag means drop is a pure "persist what
     * you can already see".
     *
     * A column-level `over` is ignored here on purpose — the container can win
     * the collision test while the pointer is still between two cards, and
     * acting on it would make cards jump to the bottom mid-drag. That case is
     * handled once, on drop. */
    if (fromStageId === toStageId) {
      const overIndex = source.findIndex((lead) => lead.id === overId);
      if (overIndex === -1 || overIndex === activeIndex) return;

      commitBoard({
        ...current,
        [fromStageId]: arrayMove(source, activeIndex, overIndex),
      });
      return;
    }

    const target = current[toStageId];
    const moved = source[activeIndex];
    const overIndex = target.findIndex((lead) => lead.id === overId);
    const insertAt = overIndex === -1 ? target.length : overIndex;

    commitBoard({
      ...current,
      [fromStageId]: source.filter((lead) => lead.id !== activeId),
      [toStageId]: [
        ...target.slice(0, insertAt),
        { ...moved, stage_id: toStageId },
        ...target.slice(insertAt),
      ],
    });
  }

  function handleDragCancel() {
    if (rollbackRef.current) commitBoard(rollbackRef.current);
    rollbackRef.current = null;
    setActiveLead(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeId = String(active.id);
    const snapshot = rollbackRef.current;

    rollbackRef.current = null;
    setActiveLead(null);

    if (!over) {
      if (snapshot) commitBoard(snapshot);
      return;
    }

    const current = boardRef.current;
    const stageId = stageIdOfLead(current, activeId);
    if (!stageId) {
      if (snapshot) commitBoard(snapshot);
      return;
    }

    // Never mutate the snapshot's arrays — it is the rollback.
    let column = [...current[stageId]];
    const fromIndex = column.findIndex((lead) => lead.id === activeId);
    if (fromIndex === -1) {
      if (snapshot) commitBoard(snapshot);
      return;
    }

    /* `handleDragOver` has already placed the card wherever the placeholder
     * showed it, so there is nothing left to work out — except one case it
     * deliberately skips: releasing over a column's empty space below the last
     * card, in the card's own column. dnd-kit reports the column droppable
     * there, so the intent ("put it at the bottom") is only unambiguous once
     * the pointer is up. */
    if (resolveStageId(current, String(over.id)) === stageId) {
      const overIndex = column.findIndex((lead) => lead.id === String(over.id));
      if (overIndex === -1 && fromIndex !== column.length - 1) {
        column = arrayMove(column, fromIndex, column.length - 1);
      }
    }

    const finalIndex = column.findIndex((lead) => lead.id === activeId);
    const position = positionForIndex(column, finalIndex);

    // Nothing actually moved — skip the write.
    const originalStageId = snapshot ? stageIdOfLead(snapshot, activeId) : null;
    const originalIndex = originalStageId
      ? snapshot![originalStageId].findIndex((lead) => lead.id === activeId)
      : -1;

    if (originalStageId === stageId && originalIndex === finalIndex) {
      if (snapshot) commitBoard(snapshot);
      return;
    }

    column[finalIndex] = {
      ...column[finalIndex],
      stage_id: stageId,
      position,
    };
    commitBoard({ ...current, [stageId]: column });

    setMoveError(null);
    startMove(async () => {
      const result = await moveLeadAction(activeId, stageId, position);
      if (!result.ok) {
        // Put the board back exactly as it was before the drag started.
        if (snapshot) commitBoard(snapshot);
        setMoveError(result.error);
      }
    });
  }

  /* --- Derived ---------------------------------------------------------- */

  const selectedLead = selectedLeadId
    ? findLead(board, selectedLeadId)
    : null;

  const allLeads = useMemo(
    () => Object.values(board).flat(),
    [board]
  );
  const total = countLeads(board);
  const openTotals = formatTotals(allLeads.filter((lead) => lead.status === "open"));

  const description = [
    `${total} ${total === 1 ? "lead" : "leads"} across ${stages.length} ${
      stages.length === 1 ? "stage" : "stages"
    }`,
    openTotals ? `${openTotals} still open` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  function openAddLead(stageId?: string) {
    setAddLeadStageId(
      stageId ?? stages.find((s) => s.is_default)?.id ?? stages[0]?.id ?? null
    );
    setAddLeadKey((key) => key + 1);
    setAddLeadOpen(true);
  }

  const closeAddLead = useCallback(() => setAddLeadOpen(false), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM pipeline"
        description={description}
        action={
          <>
            <AdminButton
              type="button"
              variant="secondary"
              onClick={() => setStageManagerOpen(true)}
            >
              <Settings2 className="h-4 w-4" />
              Manage stages
            </AdminButton>
            <AdminButton type="button" onClick={() => openAddLead()}>
              <Plus className="h-4 w-4" />
              Add lead
            </AdminButton>
          </>
        }
      />

      {moveError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-red-800">
              That card was put back
            </p>
            <p className="mt-0.5 text-xs text-red-700">{moveError}</p>
          </div>
          <button
            type="button"
            onClick={() => setMoveError(null)}
            aria-label="Dismiss"
            className="-mr-1 -mt-1 shrink-0 rounded-lg p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {stages.length === 0 ? (
        <Panel>
          <EmptyState
            icon={<Settings2 className="h-5 w-5" />}
            title="No pipeline stages yet"
            description="A board needs at least one column before leads can live on it."
            action={
              <AdminButton
                type="button"
                onClick={() => setStageManagerOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add the first stage
              </AdminButton>
            }
          />
        </Panel>
      ) : (
        <>
          {total === 0 && (
            <Panel>
              <EmptyState
                icon={<Inbox className="h-5 w-5" />}
                title="No leads on the board yet"
                description="Promote a qualified inquiry from the Inquiries tab and it will land in the default stage, or add one by hand."
                action={
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link
                      href="/admin/inquiries"
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Go to Inquiries
                    </Link>
                    <AdminButton type="button" onClick={() => openAddLead()}>
                      <Plus className="h-4 w-4" />
                      Add lead
                    </AdminButton>
                  </div>
                }
              />
            </Panel>
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="flex min-h-[24rem] items-start gap-4">
                {stages.map((stage) => (
                  <StageColumn
                    key={stage.id}
                    stage={stage}
                    leads={board[stage.id] ?? []}
                    onOpenLead={setSelectedLeadId}
                    onAddLead={openAddLead}
                  />
                ))}
              </div>
            </div>

            <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
              {activeLead ? (
                // Matches a column's inner width (19rem less its 0.75rem padding).
                <div className="w-[17.5rem]">
                  <LeadCard lead={activeLead} overlay />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </>
      )}

      <LeadFormModal
        key={addLeadKey}
        open={addLeadOpen}
        stages={stages}
        defaultStageId={addLeadStageId ?? undefined}
        onClose={closeAddLead}
      />

      {selectedLead && (
        <LeadDrawer
          key={selectedLead.id}
          lead={selectedLead}
          stages={stages}
          open
          onClose={() => setSelectedLeadId(null)}
          onDeleted={() => setSelectedLeadId(null)}
        />
      )}

      <StageManagerDrawer
        open={stageManagerOpen}
        stages={stages}
        onClose={() => setStageManagerOpen(false)}
      />
    </div>
  );
}
