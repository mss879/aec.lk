import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock3, GraduationCap, Stamp, UserRound } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { createClient } from "@/lib/supabase/server";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { formatPostDate } from "@/lib/blog";

export const metadata: Metadata = pageMetadata({
  title: "Visa Grant Success Stories",
  description:
    "Real Australian visa grants secured for AEC students — the subclass, the course, the institution and how long the grant took, told case by case.",
  path: "/success-stories",
});

export default async function SuccessStoriesPage() {
  const supabase = await createClient();

  // RLS already hides unpublished rows from visitors; the explicit filter keeps
  // a signed-in admin from seeing their drafts leak onto the public page.
  const { data, error } = await supabase
    .from("visa_grants")
    .select(
      "id, student_name, slug, nationality, visa_subclass, visa_label, course, institution, destination_country, grant_date, processing_days, summary, photo_url, is_featured"
    )
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("position", { ascending: true })
    .order("grant_date", { ascending: false });

  if (error) {
    console.error("[success-stories] failed to load:", error.message);
  }

  const stories = data ?? [];

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <BreadcrumbSchema
        items={[{ name: "Visa Grant Success Stories", path: "/success-stories" }]}
      />
      <PageHero
        title="Visa Grant Success Stories"
        subtitle="Not testimonials — outcomes. The visa, the course, the institution and how long the grant took, case by case."
        breadcrumb="Success Stories"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-6xl">
          {stories.length === 0 ? (
            <div className="rounded-[2rem] border-2 border-dashed border-slate-200 px-6 py-20 text-center">
              <Stamp className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-4 text-lg font-bold text-slate-900">
                Stories are on their way
              </p>
              <p className="mt-1 text-sm text-slate-500">
                We publish each grant with the student&apos;s consent, so this
                page fills up a little behind the good news itself.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <article
                  key={story.id}
                  className="group flex flex-col rounded-[2rem] border-2 border-slate-200 bg-white p-6 transition-colors hover:border-slate-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-50">
                      {story.photo_url ? (
                        <Image
                          src={story.photo_url}
                          alt={story.student_name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-slate-300">
                          <UserRound className="h-6 w-6" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-black text-slate-900">
                        {story.student_name}
                      </h2>
                      {story.nationality && (
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {story.nationality}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {story.visa_label ?? `Subclass ${story.visa_subclass} granted`}
                  </div>

                  {story.summary && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {story.summary}
                    </p>
                  )}

                  <dl className="mt-4 space-y-1.5 text-xs text-slate-500">
                    {(story.course || story.institution) && (
                      <div className="flex items-start gap-2">
                        <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#124b8d]" />
                        <span>
                          {[story.course, story.institution]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      </div>
                    )}
                    {story.processing_days != null && (
                      <div className="flex items-start gap-2">
                        <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#124b8d]" />
                        <span>Granted in {story.processing_days} days</span>
                      </div>
                    )}
                  </dl>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <Link
                      href={`/success-stories/${story.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-black text-[#124b8d] hover:underline"
                    >
                      Read the story
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    {story.grant_date && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {formatPostDate(story.grant_date)}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-16 rounded-[2rem] border-2 border-slate-900 bg-[#124b8d] p-8 text-center md:p-12">
            <h2 className="font-heading text-2xl font-black text-white md:text-3xl">
              Your grant could be the next one here
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm font-medium text-blue-100 md:text-base">
              Every story on this page started with a free consultation.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-900 bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(15,23,42,1)]"
              >
                Start yours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
