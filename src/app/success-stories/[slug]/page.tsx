import type { Metadata } from "next";
import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Clock3, GraduationCap, MapPin, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatPostDate, renderPostContent } from "@/lib/blog";
import { siteName, siteUrl } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { ShareLinks } from "@/components/share-links";
import { Button } from "@/components/ui/button";

/** Memoised so `generateMetadata` and the page share one query. */
const getStory = cache(async (slug: string) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("visa_grants")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  return data;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    return { title: "Story not found", robots: { index: false } };
  }

  const title =
    story.seo_title?.trim() ||
    `${story.student_name}: ${story.visa_label ?? `Subclass ${story.visa_subclass}`} granted`;
  const description =
    story.seo_description?.trim() ||
    story.summary?.trim() ||
    `How AEC secured a ${story.visa_label ?? `subclass ${story.visa_subclass}`} grant for ${story.student_name}.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/success-stories/${story.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${siteUrl}/success-stories/${story.slug}`,
      siteName,
      images: story.photo_url
        ? [{ url: story.photo_url, alt: story.student_name }]
        : [{ url: "/auseducenter_logo.png", alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: story.photo_url ? [story.photo_url] : ["/auseducenter_logo.png"],
    },
  };
}

export default async function SuccessStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) notFound();

  const blocks = renderPostContent(story.story);

  const facts = [
    story.course && {
      icon: GraduationCap,
      label: "Course",
      value: [story.course, story.institution].filter(Boolean).join(", "),
    },
    story.destination_country && {
      icon: MapPin,
      label: "Destination",
      value: story.destination_country,
    },
    story.grant_date && {
      icon: BadgeCheck,
      label: "Granted",
      value: formatPostDate(story.grant_date),
    },
    story.processing_days != null && {
      icon: Clock3,
      label: "Processing time",
      value: `${story.processing_days} days`,
    },
  ].filter((fact): fact is Exclude<typeof fact, false | null | ""> =>
    Boolean(fact)
  );

  return (
    <article className="flex w-full flex-col bg-white text-slate-900">
      <BreadcrumbSchema
        items={[
          { name: "Success Stories", path: "/success-stories" },
          { name: story.student_name, path: `/success-stories/${story.slug}` },
        ]}
      />

      <header className="border-b border-slate-100 bg-white pb-12 pt-32">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/success-stories" className="hover:underline">
              Success Stories
            </Link>
          </div>

          <div className="flex flex-col items-center gap-5 text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-50">
              {story.photo_url ? (
                <Image
                  src={story.photo_url}
                  alt={story.student_name}
                  fill
                  sizes="96px"
                  className="object-cover"
                  priority
                />
              ) : (
                <span className="flex h-full items-center justify-center text-slate-300">
                  <UserRound className="h-10 w-10" />
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
              {story.visa_label ?? `Subclass ${story.visa_subclass}`} granted
            </span>

            <h1 className="font-heading text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
              {story.student_name}
            </h1>

            {story.summary && (
              <p className="mx-auto max-w-2xl text-lg font-medium text-slate-500">
                {story.summary}
              </p>
            )}
          </div>
        </div>
      </header>

      {facts.length > 0 && (
        <div className="container mx-auto max-w-3xl px-4 pt-10">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border-2 border-slate-200 p-4 text-center"
              >
                <fact.icon className="mx-auto h-5 w-5 text-[#124b8d]" />
                <dt className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-sm font-bold text-slate-900">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          {blocks.map((block, index) => {
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
          })}

          {story.consultant_name && (
            <p className="mt-8 text-sm font-bold text-slate-400">
              Case handled by {story.consultant_name}, Australian Education
              Centre.
            </p>
          )}

          <div className="mt-10 border-t border-slate-200 pt-8">
            <ShareLinks
              path={`/success-stories/${story.slug}`}
              title={`${story.student_name} — ${story.visa_label ?? `Subclass ${story.visa_subclass}`} granted`}
            />
          </div>

          <div className="mt-10">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-[#124b8d]"
            >
              <ArrowLeft className="h-4 w-4" />
              All success stories
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#FAF8F5] py-16 text-center">
        <div className="container mx-auto max-w-3xl space-y-5 px-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#11181C]">
            Want an outcome like this?
          </h2>
          <p className="mx-auto max-w-xl text-lg font-medium text-slate-500">
            Every case is different — that is exactly why the first consultation
            is free.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button
                size="lg"
                className="rounded-full border-2 border-slate-900 bg-[#124b8d] font-bold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:bg-[#0e3d72] hover:shadow-none"
              >
                Book a free consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
