"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { signInAction, type AuthState } from "@/app/admin/auth-actions";
import {
  AdminButton,
  Field,
  FormMessage,
  inputClass,
} from "@/components/admin/ui";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? "Signing in…" : "Sign in"}
    </AdminButton>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState<AuthState, FormData>(
    signInAction,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      {state.error && <FormMessage status="error">{state.error}</FormMessage>}

      <Field label="Email address" required>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
          placeholder="you@multinational.com.au"
        />
      </Field>

      <Field label="Password" required>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
          placeholder="••••••••"
        />
      </Field>

      <SubmitButton />
    </form>
  );
}
