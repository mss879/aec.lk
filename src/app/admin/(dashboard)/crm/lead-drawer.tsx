"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import {
  ArrowRightLeft,
  CalendarClock,
  ExternalLink,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  AdminButton,
  Badge,
  FormMessage,
  formatDateTime,
  RelativeTime,
  inputClass,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type {
  ActivityType,
  Lead,
  PipelineStage,
} from "@/lib/supabase/database.types";
import {
  addLeadNoteAction,
  deleteLeadAction,
  getLeadActivitiesAction,
  updateLeadAction,
} from "./actions";
import {
  ACTIVITY_META,
  IDLE_FORM_STATE,
  NOTE_TYPE_OPTIONS,
  SOURCE_META,
  STATUS_META,
  type CrmFormState,
  type LeadActivityFeed,
} from "./board-utils";
import { LeadFormFields } from "./lead-form-fields";
import { Drawer, OverlayHeader } from "./overlays";

const ACTIVITY_ICONS: Record<ActivityType, typeof MessageSquare> = {
  created: Sparkles,
  note: MessageSquare,
  call: Phone,
  email: Mail,
  meeting: CalendarClock,
  stage_change: ArrowRightLeft,
};

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" size="sm" disabled={pending}>
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {pending ? "Saving…" : "Save changes"}
    </AdminButton>
  );
}

function AddNoteButton() {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" size="sm" disabled={pending}>
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      {pending ? "Saving…" : "Add to timeline"}
    </AdminButton>
  );
}

export function LeadDrawer({
  lead,
  stages,
  open,
  onClose,
  onDeleted,
}: {
  lead: Lead;
  stages: PipelineStage[];
  open: boolean;
  onClose: () => void;
  onDeleted: (leadId: string) => void;
}) {
  const stage = stages.find((candidate) => candidate.id === lead.stage_id);
  const source = SOURCE_META[lead.source_type];
  const status = STATUS_META[lead.status];

  const [editState, editAction] = useActionState<CrmFormState, FormData>(
    updateLeadAction,
    IDLE_FORM_STATE
  );
  const [noteState, noteAction] = useActionState<CrmFormState, FormData>(
    addLeadNoteAction,
    IDLE_FORM_STATE
  );

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, startDelete] = useTransition();

  /* --- Activity timeline -------------------------------------------------
   * The timeline is fetched on demand rather than shipped with the board, so
   * `revalidatePath` cannot refresh it — reload whenever the lead changes or a
   * note lands. The result is stored together with the request it answers, so
   * a stale response can never overwrite a newer one and the loading state is
   * derived rather than set.
   * -------------------------------------------------------------------- */
  /**
   * Only ever advances — a *failed* submit must not roll the token back, or the
   * note box would be remounted (losing what was typed) and the timeline would
   * drop to its loading state for no reason.
   */
  const [noteToken, setNoteToken] = useState(0);

  if (
    noteState.status === "success" &&
    noteState.token &&
    noteState.token !== noteToken
  ) {
    // Adjusting state during render, per the React "derive from props" recipe —
    // cheaper and less flickery than an effect, and it settles in one pass.
    setNoteToken(noteState.token);
  }

  const feedRequest = `${lead.id}:${noteToken}`;

  const [loadedFeed, setLoadedFeed] = useState<{
    request: string;
    feed: LeadActivityFeed | null;
    error: string | null;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const result = await getLeadActivitiesAction(lead.id);
      if (cancelled) return;

      setLoadedFeed(
        result.ok
          ? { request: feedRequest, feed: result.feed, error: null }
          : { request: feedRequest, feed: null, error: result.error }
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [lead.id, feedRequest]);

  const settled = loadedFeed?.request === feedRequest ? loadedFeed : null;
  const feed = settled?.feed ?? null;
  const feedError = settled?.error ?? null;

  function handleDelete() {
    setDeleteError(null);
    startDelete(async () => {
      const result = await deleteLeadAction(lead.id);
      if (result.ok) {
        onDeleted(lead.id);
      } else {
        setDeleteError(result.error);
        setConfirmingDelete(false);
      }
    });
  }

  return (
    <Drawer open={open} onClose={onClose} labelledBy="crm-lead-drawer-title">
      <OverlayHeader
        title={<span id="crm-lead-drawer-title">{lead.full_name}</span>}
        onClose={onClose}
      >
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {stage && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              {stage.name}
            </span>
          )}
          <Badge tone={status.tone}>{status.label}</Badge>
          <Badge tone={source.tone}>{source.label}</Badge>
          {lead.source_label && (
            <span className="text-[11px] text-slate-400">
              {lead.source_label}
            </span>
          )}
        </div>
      </OverlayHeader>

      <div className="flex-1 overflow-y-auto">
        {lead.inquiry_id && (
          <div className="border-b border-slate-200 bg-blue-50/60 px-5 py-3">
            <Link
              href={`/admin/inquiries/${lead.inquiry_id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View the inquiry this lead came from
            </Link>
          </div>
        )}

        {/* --- Editable fields ------------------------------------------- */}
        <form action={editAction} className="space-y-5 px-5 py-5">
          <input type="hidden" name="lead_id" value={lead.id} />

          {editState.status === "error" && editState.message && (
            <FormMessage status="error">{editState.message}</FormMessage>
          )}
          {editState.status === "success" && editState.message && (
            <FormMessage status="success">{editState.message}</FormMessage>
          )}

          {/* `updated_at` moves on every saved edit, so the fields remount on
              whatever the database actually stored. */}
          <LeadFormFields
            key={lead.updated_at}
            idPrefix={`crm-lead-${lead.id}`}
            stages={stages}
            lead={lead}
            showStatus
          />

          <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <p className="text-[11px] text-slate-400">
              Created {formatDateTime(lead.created_at)}
            </p>
            <SaveButton />
          </div>
        </form>

        {/* --- Timeline --------------------------------------------------- */}
        <div className="border-t border-slate-200 px-5 py-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Activity
          </h3>

          <form
            action={noteAction}
            className="mt-3 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
          >
            <input type="hidden" name="lead_id" value={lead.id} />

            {noteState.status === "error" && noteState.message && (
              <FormMessage status="error">{noteState.message}</FormMessage>
            )}

            {/* Remounted on every saved note, which is what empties the box. */}
            <div key={noteToken} className="space-y-3">
              <textarea
                name="body"
                rows={3}
                required
                maxLength={4000}
                className={`${inputClass} resize-y`}
                placeholder="Called and left a voicemail…"
              />

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Type
                  <select
                    name="type"
                    defaultValue="note"
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700 focus:border-blue-500 focus:outline-none"
                  >
                    {NOTE_TYPE_OPTIONS.map((type) => (
                      <option key={type} value={type}>
                        {ACTIVITY_META[type].label}
                      </option>
                    ))}
                  </select>
                </label>
                <AddNoteButton />
              </div>
            </div>
          </form>

          <div className="mt-4">
            {feedError && <FormMessage status="error">{feedError}</FormMessage>}

            {!settled && (
              <p className="flex items-center gap-2 py-4 text-xs text-slate-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading timeline…
              </p>
            )}

            {feed && feed.activities.length === 0 && (
              <p className="py-4 text-xs text-slate-400">
                Nothing logged yet. Notes, calls and stage changes appear here.
              </p>
            )}

            {feed && feed.activities.length > 0 && (
              <ol className="space-y-3">
                {feed.activities.map((activity) => {
                  const Icon = ACTIVITY_ICONS[activity.type];
                  const author = activity.created_by
                    ? feed.authors[activity.created_by]
                    : undefined;

                  return (
                    <li key={activity.id} className="flex gap-3">
                      <span
                        aria-hidden
                        className={cn(
                          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                          activity.type === "stage_change"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-xs font-bold text-slate-900">
                            {ACTIVITY_META[activity.type].label}
                          </span>
                          <RelativeTime
                            value={activity.created_at}
                            className="text-[11px] text-slate-400"
                          />
                          {author && (
                            <span className="text-[11px] text-slate-400">
                              · {author}
                            </span>
                          )}
                        </div>
                        {activity.body && (
                          <p className="mt-0.5 whitespace-pre-wrap text-xs text-slate-600">
                            {activity.body}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </div>

      {/* --- Danger zone --------------------------------------------------- */}
      <div className="border-t border-slate-200 px-5 py-4">
        {deleteError && (
          <p className="mb-2 text-xs font-medium text-red-600">{deleteError}</p>
        )}

        {confirmingDelete ? (
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-600">
              Delete {lead.full_name} and their timeline? This cannot be undone.
            </p>
            <div className="flex shrink-0 gap-2">
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
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Delete
              </AdminButton>
            </div>
          </div>
        ) : (
          <AdminButton
            type="button"
            size="sm"
            variant="danger"
            onClick={() => setConfirmingDelete(true)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete lead
          </AdminButton>
        )}
      </div>
    </Drawer>
  );
}
