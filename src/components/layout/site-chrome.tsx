"use client";

import { usePathname } from "next/navigation";

/**
 * The marketing header, footer and preloader belong to the public site only.
 * The back office at /admin has its own chrome, so this wrapper drops them
 * there rather than forcing every public page into a route group.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
}
