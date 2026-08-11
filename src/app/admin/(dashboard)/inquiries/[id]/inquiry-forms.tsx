"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRightLeft, Loader2, Trash2 } from "lucide-react";
import {
  AdminButton,
  Field,
  FormMessage,
  inputClass,
} from "@/components/admin/ui";
import {
  deleteInquiryAction,
  promoteInquiryAction,
  updateInquiryNotesAction,
  updateInquiryStatusAction,
  type InquiryActionState,
} from "../actions";

const IDLE: InquiryActionState = { status: "idle" };

/**
 * The status list is passed down rather than imported: `@/lib/inquiries` is
 * `server-only` because it can reach the service-role Supabase client.
 */
export type StatusOption = { value: string; label: string };

function Result({ state }: { state: InquiryActionState }) {
  if (state.status === "idle" || !state.message) return null;
  return (
    <FormMessage status={state.status === "success" ? "success" : "error"}>
      {state.message}
    </FormMessage>
  );
}

function SubmitButton({
  label,
  pendingLabel,
  variant = "primary",
  icon,
}: {
  label: string;
  pendingLabel: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  icon?: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" variant={variant} disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {pending ? pendingLabel : label}
    </AdminButton>
  );
}

export function StatusForm({
  id,
  current,
  statuses,
}: {
  id: string;
  current: string;
  statuses: StatusOption[];
}) {
  const [state, formAction] = useActionState<InquiryActionState, FormData>(
    updateInquiryStatusAction,
    IDLE
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="id" value={id} />

      <Field label="Status">
        <select name="status" defaultValue={current} className={inputClass}>
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </Field>

      <Result state={state} />
      <SubmitButton label="Save status" pendingLabel="Saving…" />
    </form>
  );
}

export function NotesForm({
  id,
  notes,
}: {
  id: string;
  notes: string | null;
}) {
  const [state, formAction] = useActionState<InquiryActionState, FormData>(
    updateInquiryNotesAction,
    IDLE
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="id" value={id} />

      <Field
        label="Internal notes"
        hint="Only visible in the back office. Never shown to the applicant."
      >
        <textarea
          name="admin_notes"
          rows={6}
          maxLength={5000}
          defaultValue={notes ?? ""}
          className={inputClass}
          placeholder="What was discussed, what to follow up on…"
        />
      </Field>

      <Result state={state} />
      <SubmitButton label="Save notes" pendingLabel="Saving…" />
    </form>
  );
}

export function PromoteForm({ id }: { id: string }) {
  const [state, formAction] = useActionState<InquiryActionState, FormData>(
    promoteInquiryAction,
    IDLE
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="id" value={id} />
      <Result state={state} />
      <SubmitButton
        label="Move to CRM"
        pendingLabel="Moving…"
        icon={<ArrowRightLeft className="h-4 w-4" />}
      />
    </form>
  );
}

export function DeleteForm({ id, name }: { id: string; name: string }) {
  const [state, formAction] = useActionState<InquiryActionState, FormData>(
    deleteInquiryAction,
    IDLE
  );

  return (
    <form
      action={formAction}
      className="space-y-3"
      onSubmit={(event) => {
        // Deleting is permanent and there is no undo, so make them mean it.
        if (
          !window.confirm(
            `Delete the inquiry from ${name}? This cannot be undone.`
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Result state={state} />
      <SubmitButton
        label="Delete inquiry"
        pendingLabel="Deleting…"
        variant="danger"
        icon={<Trash2 className="h-4 w-4" />}
      />
    </form>
  );
}
