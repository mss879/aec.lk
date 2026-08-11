"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { deleteTestimonialAction } from "./actions";

function DeleteButton({ compact }: { compact: boolean }) {
  const { pending } = useFormStatus();

  const Icon = pending ? Loader2 : Trash2;

  return (
    <button
      type="submit"
      disabled={pending}
      title="Delete testimonial"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white font-bold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50",
        compact ? "h-8 w-8" : "h-10 px-4 text-sm"
      )}
    >
      <Icon className={cn("h-4 w-4", pending && "animate-spin")} />
      {!compact && (pending ? "Deleting…" : "Delete testimonial")}
      {compact && <span className="sr-only">Delete</span>}
    </button>
  );
}

/**
 * Deletion is irreversible and also bins the stored photo, so it always goes
 * through a confirmation. `redirectAfter` sends the editor back to the list;
 * the list itself just revalidates in place.
 */
export function DeleteTestimonialForm({
  id,
  name,
  compact = false,
  redirectAfter = false,
}: {
  id: string;
  name: string;
  compact?: boolean;
  redirectAfter?: boolean;
}) {
  return (
    <form
      action={deleteTestimonialAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `Delete the testimonial from ${name}? This removes the photo too and cannot be undone.`
        );
        if (!confirmed) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      {redirectAfter && <input type="hidden" name="redirect_to" value="list" />}
      <DeleteButton compact={compact} />
    </form>
  );
}
