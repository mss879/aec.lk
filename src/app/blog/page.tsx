import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { formatPostDate, formatReadingTime } from "@/lib/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog | Australian Education Centre",
  description:
    "Guidance on studying in Australia — visas, scholarships, applications and student life — from the counsellors at Australian Education Centre.",
};

function readCategory(value: string | string[] | undefined): string | null {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed ? trimmed : null;
}

/** Upper bound on the articles rendered per view. See the note in the query. */
const POSTS_PER_PAGE = 120;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const activeCategory = readCategory((await searchParams).category);

  const supabase = await createClient();
  const now = new Date().toISOString();

  // An admin browsing the public site is allowed to read drafts by RLS, so the
  // published filter has to be explicit here rather than assumed.
  const publishedOnly = () =>
    supabase
      .from("blog_posts")
      .select(
        "id, title, slug, excerpt, category, cover_image_url, author_name, published_at, reading_minutes"
      )
      .eq("status", "published")
      .not("published_at", "is", null)
      .lte("published_at", now);

  // PostgREST silently caps an unbounded select at 1000 rows, which would one
  // day drop the oldest posts with no sign that anything was missing. Filter and
  // bound the query explicitly instead, so the limit is a decision rather than
  // an accident. Swap this for pagination when the archive outgrows it.
  const listQuery = publishedOnly()
    .order("published_at", { ascending: false })
    .limit(POSTS_PER_PAGE);

  if (activeCategory) {
    listQuery.eq("category", activeCategory);
  }

  // Category chips are derived from a separate, narrow read so that filtering
  // the list never shrinks the set of filters on offer.
  const [{ data: listData }, { data: categoryRows }] = await Promise.all([
    listQuery,
    supabase
      .from("blog_posts")
      .select("category")
      .eq("status", "published")
      .not("published_at", "is", null)
      .lte("published_at", now)
      .not("category", "is", null),
  ]);

  const visible = listData ?? [];

  const categories = Array.from(
    new Set(
      (categoryRows ?? [])
        .map((row) => row.category)
        .filter((category): category is string => Boolean(category))
    )
  ).sort((a, b) => a.localeCompare(b));

  return (
    <div className="flex w-full flex-col bg-white text-slate-900">
      <PageHero
        title="Insights for Your Australian Journey"
        subtitle="Practical guidance on visas, scholarships, applications and settling in — written by the counsellors who do this every day."
        breadcrumb="Blog"
        bgImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2940&auto=format&fit=crop"
      />

      <section className="border-b border-slate-200 bg-white py-24">
        <div className="container mx-auto max-w-7xl px-4">
          {categories.length > 0 && (
            <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/blog"
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                  activeCategory === null
                    ? "border-[#124b8d] bg-[#124b8d] text-white"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900"
                )}
              >
                All articles
              </Link>

              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${encodeURIComponent(category)}`}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                    activeCategory === category
                      ? "border-[#124b8d] bg-[#124b8d] text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900"
                  )}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}

          {visible.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-slate-200 bg-[#FAF8F5] px-8 py-20 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[#124b8d]">
                <Newspaper className="h-8 w-8" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#11181C]">
                {activeCategory
                  ? `Nothing filed under “${activeCategory}” yet`
                  : "Articles are on the way"}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
                {activeCategory
                  ? "Try another topic, or read everything we have published so far."
                  : "Our counsellors are writing up the guidance they give every day. In the meantime, book a free consultation and ask us directly."}
              </p>
              <div className="mt-8">
                <Link href={activeCategory ? "/blog" : "/contact"}>
                  <Button
                    size="lg"
                    className="h-12 rounded-full border-2 border-slate-900 bg-[#124b8d] font-bold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:bg-[#0e3d72] hover:shadow-none"
                  >
                    {activeCategory ? "View all articles" : "Talk to a counsellor"}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {post.cover_image_url ? (
                      <Image
                        src={post.cover_image_url}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#124b8d] via-[#1a5fae] to-[#0e3d72]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                        <span className="relative font-heading text-4xl font-black tracking-widest text-white/80">
                          AEC
                        </span>
                      </div>
                    )}

                    {post.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#124b8d] shadow-sm">
                        {post.category}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h2 className="font-heading text-xl font-bold leading-snug text-[#11181C] transition-colors group-hover:text-[#124b8d]">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                      <span>{formatPostDate(post.published_at)}</span>
                      <span className="flex items-center gap-1 font-bold text-[#124b8d]">
                        {formatReadingTime(post.reading_minutes)}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#FAF8F5] py-24">
        <div className="container mx-auto max-w-4xl space-y-6 px-4 text-center">
          <span className="mb-1 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
            Free Consultation
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C] md:text-5xl">
            Have a question the blog did not answer?
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
            Our PIER-certified counsellors and MARA-registered migration agents
            will assess your profile and map the pathway that fits you.
          </p>
          <div className="pt-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="h-12 rounded-full border-2 border-slate-900 bg-[#124b8d] font-bold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:bg-[#0e3d72] hover:shadow-none"
              >
                Book Your FREE Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
