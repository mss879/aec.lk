import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import { FormMessage } from "@/components/admin/ui";
import { signOutAction } from "@/app/admin/auth-actions";

export const metadata: Metadata = {
  title: "Sign in · AEC Back Office",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next = "/admin", error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <img
            src="/auseducenter_logo.png"
            alt="Australian Education Centre"
            className="mx-auto h-16 w-auto object-contain"
          />
          <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-900">
            Back Office
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage inquiries, leads, testimonials and the blog.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {error === "forbidden" && (
            <div className="mb-5 space-y-3">
              <FormMessage status="error">
                That account is signed in but does not have back-office access.
              </FormMessage>
              {/* The stale session is still in the cookie jar, and a Server
                  Component cannot clear it. Offer the sign-out explicitly so
                  the visitor is not stuck looking at a login form they are
                  technically already past. */}
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Sign out and use a different account
                </button>
              </form>
            </div>
          )}

          <LoginForm next={next} />
        </div>

        <p className="text-center text-xs text-slate-400">
          Access is granted by an owner from the Supabase dashboard.
        </p>
      </div>
    </div>
  );
}
