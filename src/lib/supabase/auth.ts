import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { AdminUser } from "@/lib/supabase/database.types";

/**
 * Resolves the signed-in back-office user, or null.
 *
 * Being authenticated with Supabase is not sufficient — the account must also
 * appear in `public.admin_users`. That allowlist is what every RLS policy keys
 * off, so this check and the database agree by construction.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: admin } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return admin ?? null;
}

/**
 * Same as `getAdminUser`, but sends non-admins to the login screen.
 *
 * Call this at the top of every admin Server Action — Server Actions are
 * reachable by direct POST, not only through the UI.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/login?error=forbidden");
  }

  return admin;
}
