import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarClock, ExternalLink, Pin, ScrollText } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { createClient } from "@/lib/supabase/server";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { formatPostDate } from "@/lib/blog";
import {
  VISA_NEWS_CATEGORIES,
  type VisaNewsCategory,
} from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Student Visa News",
  description:
    "Australian student visa policy, processing time, fee and occupation list changes — explained plainly by AEC's registered migration advisers, with links to the official announcements.",
  path: "/visa-news",
});

/** Narrows the query string to a known category, so it can be used as a filter. */
function readCategory(
  value: string | string[] | undefined
): VisaNewsCategory | null {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed &&
    (VISA_NEWS_CATEGORIES as readonly string[]).includes(trimmed)
    ? (trimmed as VisaNewsCategory)
    : null;
}

export default async function VisaNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const active = readCategory((await searchParams).category);

  const supabase = await createClient();
  const now = new Date().toISOString();

  // An admin browsing the public site can read drafts under RLS, so the
  // published filter is explicit rather than assumed.
  let query = supabase
    .from("visa_news")
    .select(
      "id, title, slug, summary, category, effective_date, source_name, source_url, cover_image_url, is_pinned, published_at"
    )
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", now)
    .order("is_pinned", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(120);

  if (active) query = query.eq("category", active);

  const { data, error } = await query;

  if (error) {
    console.error("[visa-news] failed to load:", error.message);
  }

  const items = data ?? [];

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <BreadcrumbSchema items={[{ name: "Student Visa News", path: "/visa-news" }]} />
      <PageHero
        title="Student Visa News"
        subtitle="Policy, processing and fee changes that affect your application — with the official source attached."
        breadcrumb="Visa News"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-6xl">
          <div className="mb-10 flex flex-wrap gap-2">
            <Link
              href="/visa-news"
              className={cn(
                "rounded-full border-2 px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors",
                active === null
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-900"
              )}
            >
              All updates
            </Link>
            {VISA_NEWS_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/visa-news?category=${encodeURIComponent(category)}`}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors",
                  active === category
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-900"
                )}
              >
                {category}
              </Link>
            ))}
          </div>

          {items.length === 0 ? (
            <div className="rounded-[2rem] border-2 border-dashed border-slate-200 px-6 py-20 text-center">
              <ScrollText className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-4 text-lg font-bold text-slate-900">
                {active ? "Nothing filed under that yet" : "No updates published yet"}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Visa rules move often. Check back, or{" "}
                <Link href="/contact" className="font-bold text-[#124b8d] hover:underline">
                  ask a counsellor
                </Link>{" "}
                about your own case.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white transition-colors hover:border-slate-900"
                >
                  {item.cover_image_url && (
                    <div className="relative h-44 w-full overflow-hidden border-b-2 border-slate-200">
                      <Image
                        src={item.cover_image_url}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.is_pinned && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-700">
                          <Pin className="h-3 w-3" />
                          Pinned
                        </span>
                      )}
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#124b8d]">
                        {item.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-black leading-tight text-slate-900">
                      <Link href={`/visa-news/${item.slug}`} className="hover:text-[#124b8d]">
                        {item.title}
                      </Link>
                    </h2>

                    {item.summary && (
                      <p className="text-sm leading-relaxed text-slate-600">{item.summary}</p>
                    )}

                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <span>{formatPostDate(item.published_at)}</span>
                      {item.effective_date && (
                        <span className="inline-flex items-center gap-1 text-[#e31b23]">
                          <CalendarClock className="h-3.5 w-3.5" />
                          Effective {formatPostDate(item.effective_date)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2">
                      <Link
                        href={`/visa-news/${item.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-black text-[#124b8d] hover:underline"
                      >
                        Read the update
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>

                      {item.source_url && (
                        <a
                          href={item.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-900"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {item.source_name ?? "Source"}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
