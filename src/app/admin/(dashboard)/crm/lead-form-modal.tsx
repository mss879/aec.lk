"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { AdminButton, FormMessage } from "@/components/admin/ui";
import type { PipelineStage } from "@/lib/supabase/database.types";
import { createLeadAction } from "./actions";
import { IDLE_FORM_STATE, type CrmFormState } from "./board-utils";
import { LeadFormFields } from "./lead-form-fields";
import { Modal, OverlayHeader } from "./overlays";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" disabled={pending}>
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? "Adding…" : "Add lead"}
    </AdminButton>
  );
}

/**
 * "Add lead" modal.
 *
 * The board remounts this with a fresh `key` every time it is opened, which is
 * what resets both the uncontrolled fields and the `useActionState` result from
 * the previous visit.
 */
export function LeadFormModal({
  open,
  stages,
  defaultStageId,
  onClose,
}: {
  open: boolean;
  stages: PipelineStage[];
  defaultStageId?: string;
  onClose: () => void;
}) {
  const [state, formAction] = useActionState<CrmFormState, FormData>(
    createLeadAction,
    IDLE_FORM_STATE
  );

  const handledToken = useRef(state.token);

  useEffect(() => {
    if (state.status !== "success") return;
    if (state.token === handledToken.current) return;
    handledToken.current = state.token;
    onClose();
  }, [state.status, state.token, onClose]);

  return (
    <Modal open={open} onClose={onClose} labelledBy="crm-add-lead-title">
      <OverlayHeader
        title={<span id="crm-add-lead-title">Add a lead</span>}
        description="Leads created here are tagged with a manual source."
        onClose={onClose}
      />

      <form action={formAction} className="space-y-5 px-5 py-5">
        {state.status === "error" && state.message && (
          <FormMessage status="error">{state.message}</FormMessage>
        )}

        {stages.length === 0 ? (
          <FormMessage status="error">
            Add a pipeline stage before creating leads.
          </FormMessage>
        ) : (
          <LeadFormFields
            idPrefix="crm-add-lead"
            stages={stages}
            defaultStageId={defaultStageId}
          />
        )}

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
          <AdminButton type="button" variant="secondary" onClick={onClose}>
            Cancel
          </AdminButton>
          {stages.length > 0 && <SubmitButton />}
        </div>
      </form>
    </Modal>
  );
}
