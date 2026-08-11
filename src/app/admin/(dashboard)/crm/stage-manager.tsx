"use client";

import { useActionState, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Lock,
  Plus,
  Trash2,
} from "lucide-react";
import {
  AdminButton,
  Field,
  FormMessage,
  inputClass,
  labelClass,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { PipelineStage } from "@/lib/supabase/database.types";
import {
  createStageAction,
  deleteStageAction,
  reorderStagesAction,
  updateStageAction,
} from "./actions";
import {
  DEFAULT_STAGE_COLOR,
  IDLE_FORM_STATE,
  STAGE_COLOR_PRESETS,
  type CrmFormState,
} from "./board-utils";
import { Drawer, OverlayHeader } from "./overlays";

/**
 * Name / description / colour, shared by the add form and every stage row.
 *
 * Entirely uncontrolled apart from the colour swatches, which need local state
 * to show a selection. Callers reset it by remounting with a new `key` — after
 * a successful add, or when a saved row comes back from the server — which
 * keeps every "sync state from props" effect out of this file.
 */
function StageFieldset({
  lockedName,
  defaultName,
  defaultDescription,
  defaultColor,
}: {
  /** Set for the default stage: its name is shown but never editable. */
  lockedName?: string;
  defaultName?: string;
  defaultDescription?: string;
  defaultColor: string;
}) {
  const [color, setColor] = useState(defaultColor);

  return (
    <div className="space-y-3">
      <input type="hidden" name="color" value={color} />

      {lockedName ? (
        <div>
          <span className={labelClass}>Name</span>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
            <Lock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate text-sm font-bold text-slate-700">
              {lockedName}
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">
            Locked. Every inquiry promoted from the Inquiries tab lands in this
            stage, so it cannot be renamed or deleted.
          </p>
        </div>
      ) : (
        <Field label="Name" required>
          <input
            name="name"
            type="text"
            required
            maxLength={60}
            defaultValue={defaultName ?? ""}
            autoComplete="off"
            className={inputClass}
            placeholder="Visa lodged"
          />
        </Field>
      )}

      <Field label="Description">
        <input
          name="description"
          type="text"
          maxLength={160}
          defaultValue={defaultDescription ?? ""}
          autoComplete="off"
          className={inputClass}
          placeholder="What has to be true for a lead to sit here?"
        />
      </Field>

      <div className="space-y-1.5">
        <span className={labelClass}>Colour</span>
        <div className="flex flex-wrap gap-1.5">
          {STAGE_COLOR_PRESETS.map((preset) => {
            const selected = preset.toLowerCase() === color.toLowerCase();

            return (
              <button
                key={preset}
                type="button"
                onClick={() => setColor(preset)}
                aria-label={`Use colour ${preset}`}
                aria-pressed={selected}
                className={cn(
                  "h-6 w-6 rounded-full transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
                  selected
                    ? "scale-110 ring-2 ring-slate-900 ring-offset-2"
                    : "ring-1 ring-slate-200 hover:scale-105"
                )}
                style={{ backgroundColor: preset }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SaveStageButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" size="sm" disabled={pending}>
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {pending ? "Saving…" : label}
    </AdminButton>
  );
}

function AddStageForm() {
  const [state, formAction] = useActionState<CrmFormState, FormData>(
    createStageAction,
    IDLE_FORM_STATE
  );

  // A fresh key after every successful add empties the fields again.
  const fieldsetKey = state.status === "success" ? `added-${state.token}` : "new";

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
        New stage
      </p>

      {state.status === "error" && state.message && (
        <FormMessage status="error">{state.message}</FormMessage>
      )}
      {state.status === "success" && state.message && (
        <FormMessage status="success">{state.message}</FormMessage>
      )}

      <StageFieldset key={fieldsetKey} defaultColor={DEFAULT_STAGE_COLOR} />

      <div className="flex justify-end">
        <SaveStageButton label="Add stage" />
      </div>
    </form>
  );
}

function StageRow({
  stage,
  index,
  total,
  onMove,
  onDelete,
  busy,
}: {
  stage: PipelineStage;
  index: number;
  total: number;
  onMove: (stageId: string, direction: -1 | 1) => void;
  onDelete: (stageId: string) => void;
  busy: boolean;
}) {
  const [state, formAction] = useActionState<CrmFormState, FormData>(
    updateStageAction,
    IDLE_FORM_STATE
  );
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex shrink-0 flex-col gap-1">
          <button
            type="button"
            disabled={index === 0 || busy}
            onClick={() => onMove(stage.id, -1)}
            aria-label={`Move ${stage.name} earlier in the pipeline`}
            className="rounded-lg border border-slate-200 p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={index === total - 1 || busy}
            onClick={() => onMove(stage.id, 1)}
            aria-label={`Move ${stage.name} later in the pipeline`}
            className="rounded-lg border border-slate-200 p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <form action={formAction} className="min-w-0 flex-1 space-y-3">
          <input type="hidden" name="stage_id" value={stage.id} />

          {state.status === "error" && state.message && (
            <FormMessage status="error">{state.message}</FormMessage>
          )}

          {/* `updated_at` changes on every saved edit, so the fieldset remounts
              on whatever the database actually stored. */}
          <StageFieldset
            key={stage.updated_at}
            lockedName={stage.is_default ? stage.name : undefined}
            defaultName={stage.name}
            defaultDescription={stage.description ?? ""}
            defaultColor={stage.color}
          />

          <div className="flex items-center justify-between gap-2 pt-1">
            {stage.is_default ? (
              <span />
            ) : confirmingDelete ? (
              <div className="flex items-center gap-2">
                <AdminButton
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setConfirmingDelete(false)}
                >
                  Cancel
                </AdminButton>
                <AdminButton
                  type="button"
                  size="sm"
                  variant="danger"
                  disabled={busy}
                  onClick={() => {
                    setConfirmingDelete(false);
                    onDelete(stage.id);
                  }}
                >
                  Delete stage
                </AdminButton>
              </div>
            ) : (
              <AdminButton
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setConfirmingDelete(true)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </AdminButton>
            )}

            <SaveStageButton label="Save" />
          </div>

          {confirmingDelete && !stage.is_default && (
            <p className="text-[11px] text-amber-700">
              Any leads still in this stage move to the default stage. No lead is
              deleted.
            </p>
          )}
        </form>
      </div>
    </li>
  );
}

export function StageManagerDrawer({
  open,
  stages,
  onClose,
}: {
  open: boolean;
  stages: PipelineStage[];
  onClose: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showAddForm, setShowAddForm] = useState(false);

  function handleMove(stageId: string, direction: -1 | 1) {
    const order = stages.map((stage) => stage.id);
    const from = order.indexOf(stageId);
    const to = from + direction;
    if (from === -1 || to < 0 || to >= order.length) return;

    [order[from], order[to]] = [order[to], order[from]];

    setError(null);
    startTransition(async () => {
      const result = await reorderStagesAction(order);
      if (!result.ok) setError(result.error);
    });
  }

  function handleDelete(stageId: string) {
    setError(null);
    startTransition(async () => {
      const result = await deleteStageAction(stageId);
      if (!result.ok) setError(result.error);
    });
  }

  return (
    <Drawer open={open} onClose={onClose} labelledBy="crm-stage-manager-title">
      <OverlayHeader
        title={<span id="crm-stage-manager-title">Pipeline stages</span>}
        description="Rename, recolour, reorder and remove the columns on the board."
        onClose={onClose}
      />

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {error && <FormMessage status="error">{error}</FormMessage>}

        {showAddForm ? (
          <AddStageForm />
        ) : (
          <AdminButton
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="w-full"
          >
            <Plus className="h-3.5 w-3.5" />
            Add stage
          </AdminButton>
        )}

        <ol className="space-y-3">
          {stages.map((stage, index) => (
            <StageRow
              key={stage.id}
              stage={stage}
              index={index}
              total={stages.length}
              onMove={handleMove}
              onDelete={handleDelete}
              busy={isPending}
            />
          ))}
        </ol>
      </div>
    </Drawer>
  );
}
