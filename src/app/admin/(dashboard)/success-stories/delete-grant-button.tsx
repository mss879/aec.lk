"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Trash2 } from "lucide-react";
import { deleteGrantAction } from "./actions";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      title={label}
      aria-label={label}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

export function DeleteGrantButton({
  id,
  name,
  redirectAfter = false,
}: {
  id: string;
  name: string;
  redirectAfter?: boolean;
}) {
  return (
    <form
      action={deleteGrantAction}
      onSubmit={(event) => {
        // Deleting takes the student photo with it and cannot be undone.
        if (!confirm(`Delete the story for ${name}? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      {redirectAfter && <input type="hidden" name="redirect_to" value="1" />}
      <Submit label={`Delete story for ${name}`} />
    </form>
  );
}
