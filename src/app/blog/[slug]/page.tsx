import { cache } from "react";
import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import {
  formatPostDate,
  formatReadingTime,
  renderPostContent,
} from "@/lib/blog";

/**
 * Memoised for the request so `generateMetadata` and the page itself share a
 * single query. An admin session can read drafts under RLS, so "published" is
 * filtered explicitly rather than left to the policy.
 */
const getPost = cache(async (slug: string) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("blog_posts")
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
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false } };
  }

  const title = post.seo_title?.trim() || post.title;
  const description =
    post.seo_description?.trim() ||
    post.excerpt?.trim() ||
    `Read “${post.title}” on the Australian Education Centre blog.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      authors: post.author_name ? [post.author_name] : undefined,
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, alt: post.title }]
        : [{ url: "/auseducenter_logo.png", alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : ["/auseducenter_logo.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const blocks = renderPostContent(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image_url ?? `${siteUrl}/auseducenter_logo.png`,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    author: post.author_name
      ? { "@type": "Person", name: post.author_name }
      : { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
    articleSection: post.category ?? undefined,
  };

  return (
    <article className="flex w-full flex-col bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      {/* Masthead */}
      <header className="border-b border-slate-100 bg-white pb-12 pt-32">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </div>

          <div className="space-y-6 text-center">
            {post.category && (
              <Link
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 transition-colors hover:bg-blue-100"
              >
                {post.category}
              </Link>
            )}

            <h1 className="font-heading text-3xl font-black leading-tight tracking-tight text-[#11181C] sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-slate-500 md:text-lg">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
              {post.author_name && (
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-[#124b8d]" />
                  {post.author_name}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-[#124b8d]" />
                {formatPostDate(post.published_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#124b8d]" />
                {formatReadingTime(post.reading_minutes)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Cover */}
      {post.cover_image_url && (
        <div className="container mx-auto max-w-5xl px-4 pt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-slate-200 shadow-lg">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 64rem"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="mx-auto max-w-[65ch]">
          {blocks.length === 0 ? (
            <p className="text-base leading-relaxed text-slate-500">
              This article is still being written. Check back shortly.
            </p>
          ) : (
            blocks.map((block, index) => {
              switch (block.kind) {
                case "heading":
                  return block.level === 2 ? (
                    <h2
                      key={index}
                      className="mb-4 mt-12 font-heading text-2xl font-bold leading-tight text-[#11181C] md:text-3xl"
                    >
                      {block.text}
                    </h2>
                  ) : (
                    <h3
                      key={index}
                      className="mb-3 mt-10 font-heading text-xl font-bold leading-tight text-[#11181C] md:text-2xl"
                    >
                      {block.text}
                    </h3>
                  );

                case "list":
                  return block.ordered ? (
                    <ol
                      key={index}
                      className="my-6 list-decimal space-y-2 pl-6 text-base leading-relaxed text-slate-600 marker:font-bold marker:text-[#124b8d]"
                    >
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul
                      key={index}
                      className="my-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-600 marker:text-[#e31b23]"
                    >
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );

                case "quote":
                  return (
                    <blockquote
                      key={index}
                      className="my-8 rounded-r-2xl border-l-4 border-[#124b8d] bg-[#FAF8F5] px-6 py-5 text-base font-medium italic leading-relaxed text-slate-700"
                    >
                      {block.text}
                    </blockquote>
                  );

                default:
                  return (
                    <p
                      key={index}
                      className="my-5 text-base leading-relaxed text-slate-600 md:text-[17px]"
                    >
                      {block.text}
                    </p>
                  );
              }
            })
          )}

          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 border-t border-slate-200 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#124b8d] transition-colors hover:text-[#0e3d72]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </div>

      {/* Consultation CTA */}
      <section className="border-t border-slate-200 bg-[#FAF8F5] py-24">
        <div className="container mx-auto max-w-4xl space-y-6 px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
            Next Step
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C] md:text-5xl">
            Ready to Plan Your Own Pathway?
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
            Bring us your transcripts and your questions. A PIER-certified
            counsellor will map the courses, costs and visa steps that fit your
            profile — at no charge.
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
    </article>
  );
}
