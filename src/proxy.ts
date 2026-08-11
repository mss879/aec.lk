import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 renamed the `middleware` convention to `proxy`.
 *
 * Two jobs, both scoped to /admin:
 *   1. Refresh the Supabase session cookie before the page renders, so server
 *      components never see a stale token.
 *   2. Bounce signed-out visitors to the login screen.
 *
 * This is a convenience gate, not the security boundary — that is Row Level
 * Security in Postgres, plus the admin allowlist check in the admin layout.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
          // Responses that set auth cookies must never be cached by a CDN.
          Object.entries(headers ?? {}).forEach(([key, value]) =>
            response.headers.set(key, value)
          );
        },
      },
    }
  );

  // Must be awaited before the response is returned, otherwise a refreshed
  // token cannot be written back to the cookie jar.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginRoute = pathname === "/admin/login";

  if (!user && !isLoginRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Signed in already? Skip the login screen — unless the admin layout sent them
  // here because the account is authenticated but not on the admin allowlist.
  // Bouncing that case back to /admin would loop forever between the two.
  const wasRejected = request.nextUrl.searchParams.has("error");

  if (user && isLoginRoute && !wasRejected) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/admin";
    dashboardUrl.search = "";
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
