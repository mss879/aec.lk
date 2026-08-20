import type { Metadata } from "next";
import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarClock, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatPostDate, renderPostContent } from "@/lib/blog";
import { siteName, siteUrl } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { ShareLinks } from "@/components/share-links";
import { Button } from "@/components/ui/button";

/**
 * Memoised for the request so `generateMetadata` and the page share one query.
 * An admin session can read drafts under RLS, so "published" is filtered
 * explicitly rather than left to the policy.
 */
const getItem = cache(async (slug: string) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("visa_news")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  return data;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItem(slug);

  if (!item) {
    return { title: "Update not found", robots: { index: false } };
  }

  const title = item.seo_title?.trim() || item.title;
  const description =
    item.seo_description?.trim() ||
    item.summary?.trim() ||
    `The latest on ${item.title.toLowerCase()} from Australian Education Centre.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/visa-news/${item.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${siteUrl}/visa-news/${item.slug}`,
      siteName,
      publishedTime: item.published_at ?? undefined,
      modifiedTime: item.updated_at ?? undefined,
      images: item.cover_image_url
        ? [{ url: item.cover_image_url, alt: item.title }]
        : [{ url: "/auseducenter_logo.png", alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: item.cover_image_url
        ? [item.cover_image_url]
        : ["/auseducenter_logo.png"],
    },
  };
}

export default async function VisaNewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getItem(slug);

  if (!item) notFound();

  const blocks = renderPostContent(item.content);

  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.summary ?? undefined,
    image: item.cover_image_url ?? `${siteUrl}/auseducenter_logo.png`,
    datePublished: item.published_at ?? undefined,
    dateModified: item.updated_at ?? item.published_at ?? undefined,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/visa-news/${item.slug}`,
    },
    articleSection: item.category,
    ...(item.source_url
      ? { citation: { "@type": "CreativeWork", url: item.source_url, name: item.source_name ?? undefined } }
      : {}),
  };

  return (
    <article className="flex w-full flex-col bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Student Visa News", path: "/visa-news" },
          { name: item.title, path: `/visa-news/${item.slug}` },
        ]}
      />

      <header className="border-b border-slate-100 bg-white pb-12 pt-32">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/visa-news" className="hover:underline">Visa News</Link>
          </div>

          <div className="space-y-6 text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#124b8d]">
              {item.category}
            </span>

            <h1 className="font-heading text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
              {item.title}
            </h1>

            {item.summary && (
              <p className="mx-auto max-w-2xl text-lg font-medium text-slate-500">
                {item.summary}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Published {formatPostDate(item.published_at)}</span>
              {item.effective_date && (
                <span className="inline-flex items-center gap-1 text-[#e31b23]">
                  <CalendarClock className="h-3.5 w-3.5" />
                  Effective {formatPostDate(item.effective_date)}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {item.cover_image_url && (
        <div className="container mx-auto max-w-4xl px-4 pt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border-2 border-slate-200">
            <Image
              src={item.cover_image_url}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          {blocks.length === 0 ? (
            <p className="text-lg text-slate-500">
              This update has no details yet.
            </p>
          ) : (
            blocks.map((block, index) => {
              switch (block.kind) {
                case "heading":
                  return (
                    <h2
                      key={index}
                      className="mt-10 font-heading text-2xl font-black tracking-tight text-slate-900 md:text-3xl"
                    >
                      {block.text}
                    </h2>
                  );
                case "quote":
                  return (
                    <blockquote
                      key={index}
                      className="my-8 border-l-4 border-[#124b8d] bg-slate-50 py-4 pl-6 pr-4 text-lg font-medium italic text-slate-700"
                    >
                      {block.text}
                    </blockquote>
                  );
                case "list":
                  return (
                    <ul key={index} className="my-6 space-y-2 pl-5">
                      {block.items.map((entry, entryIndex) => (
                        <li
                          key={entryIndex}
                          className="list-disc text-lg leading-relaxed text-slate-600"
                        >
                          {entry}
                        </li>
                      ))}
                    </ul>
                  );
                default:
                  return (
                    <p
                      key={index}
                      className="my-5 text-lg leading-relaxed text-slate-600"
                    >
                      {block.text}
                    </p>
                  );
              }
            })
          )}

          {item.source_url && (
            <div className="mt-10 rounded-2xl border-2 border-slate-200 bg-slate-50 p-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Official source
              </p>
              <a
                href={item.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#124b8d] hover:underline"
              >
                {item.source_name ?? item.source_url}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Visa rules change without notice and this summary is general
                information, not migration advice. Check the official notice, or
                talk to our registered advisers about your own circumstances.
              </p>
            </div>
          )}

          <div className="mt-10 border-t border-slate-200 pt-8">
            <ShareLinks path={`/visa-news/${item.slug}`} title={item.title} />
          </div>

          <div className="mt-10">
            <Link
              href="/visa-news"
              className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-[#124b8d]"
            >
              <ArrowLeft className="h-4 w-4" />
              All visa news
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#FAF8F5] py-16 text-center">
        <div className="container mx-auto max-w-3xl space-y-5 px-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C]">
            Not sure how this affects you?
          </h2>
          <p className="mx-auto max-w-xl text-lg font-medium text-slate-500">
            Our MARA-registered advisers read every one of these notices so you
            do not have to. Bring us your case and we will tell you what changes.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button
                size="lg"
                className="rounded-full border-2 border-slate-900 bg-[#124b8d] font-bold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:bg-[#0e3d72] hover:shadow-none"
              >
                Talk to an adviser
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
