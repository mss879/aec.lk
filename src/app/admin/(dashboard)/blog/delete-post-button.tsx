"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Trash2 } from "lucide-react";
import { AdminButton } from "@/components/admin/ui";
import { deletePostAction } from "./actions";

function DeleteSubmit({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" variant="danger" size="sm" disabled={pending}>
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
      {label}
    </AdminButton>
  );
}

/**
 * Deleting is irreversible and also removes the cover image from storage, so it
 * asks first. Cancelling prevents the form's default submit, which is what stops
 * React from running the Server Action.
 */
export function DeletePostButton({
  id,
  title,
  label = "Delete",
}: {
  id: string;
  title: string;
  label?: string;
}) {
  return (
    <form
      action={deletePostAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Delete “${title}”? This removes the post and its cover image for good.`
        );
        if (!confirmed) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <DeleteSubmit label={label} />
    </form>
  );
}
