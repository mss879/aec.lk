"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string };

/**
 * Password sign-in for the back office.
 *
 * Two gates: Supabase Auth must accept the credentials, and the account must
 * also appear in `public.admin_users`. A valid Supabase user who is not on that
 * allowlist is signed straight back out — otherwise they would hold a session
 * cookie that RLS rejects on every query, which looks like a broken app rather
 * than a refused login.
 */
export async function signInAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const requestedNext = String(formData.get("next") ?? "");

  if (!email || !password) {
    return { error: "Enter your email address and password." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Incorrect email address or password." };
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return {
      error:
        "That account does not have back-office access. Ask an owner to add you.",
    };
  }

  // Only ever follow an internal /admin path, so `?next=` cannot be used to
  // bounce a freshly signed-in admin to an external site.
  const destination =
    requestedNext.startsWith("/admin") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/admin";

  redirect(destination);
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
