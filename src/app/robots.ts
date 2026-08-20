import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Deliberately no `disallow` for /admin.
 *
 * robots.txt is a public file, so listing the back office there advertises the
 * login URL to every scraper looking for one — and it would not keep the page
 * out of the index anyway: robots.txt only asks crawlers not to *fetch* a URL,
 * and a disallowed page can still be indexed from an inbound link (Google just
 * shows it without a snippet). Worse, a crawler that is told not to fetch the
 * page can never see the noindex on it.
 *
 * The back office is kept out of search by the things that actually work:
 * `robots: { index: false }` on the admin layout and login page, the auth gate
 * in src/proxy.ts, and Row Level Security in Postgres. Nothing links to /admin
 * from the public site, so it is not discoverable by crawling either.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
