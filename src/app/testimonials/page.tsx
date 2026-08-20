import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  MapPin,
  MessageSquare,
  Quote as QuoteIcon,
  Star,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/supabase/database.types";

export const metadata: Metadata = pageMetadata({
  title: "Student Success Stories",
  description:
    "Real stories from students who studied in Australia with the Australian Education Centre — university placements, visas, and settling in, told in their own words.",
  path: "/testimonials",
});

// --- Small presentational pieces ------------------------------------------

/** "Dinuka Perera" → "DP". The graceful stand-in when there is no photo. */
function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "AEC";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={cn("flex gap-1 text-[#e31b23]", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={cn(
            "w-4 h-4",
            value <= rating ? "fill-current" : "fill-transparent text-slate-300"
          )}
        />
      ))}
    </div>
  );
}

function Avatar({
  testimonial,
  className,
  textClassName,
}: {
  testimonial: Testimonial;
  className?: string;
  textClassName?: string;
}) {
  if (testimonial.image_url) {
    return (
      // Plain <img> so the page renders identically in every environment,
      // whether or not the Supabase host resolved into next.config.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={testimonial.image_url}
        alt={testimonial.name}
        className={cn("object-cover bg-slate-100", className)}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center justify-center bg-[#124b8d] text-white font-black tracking-wide select-none",
        className,
        textClassName
      )}
    >
      {initialsFor(testimonial.name)}
    </div>
  );
}

function Attribution({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div>
      <h3 className="font-bold text-sm text-[#11181C]">{testimonial.name}</h3>
      {testimonial.role && (
        <p className="text-[11px] text-slate-500 mt-0.5">{testimonial.role}</p>
      )}
      {testimonial.institution && (
        <p className="text-[10px] font-bold text-[#124b8d] mt-1 uppercase tracking-wider">
          {testimonial.institution}
        </p>
      )}
      {testimonial.location && (
        <p className="flex items-center gap-1 text-[10px] text-slate-400 mt-1.5">
          <MapPin className="w-3 h-3" />
          {testimonial.location}
        </p>
      )}
    </div>
  );
}

/** The standard card — the idiom already used across the marketing site. */
function StoryCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="bg-[#FAF8F5] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden p-8 flex flex-col justify-between rounded-[2rem]">
      <div className="absolute top-4 right-8 text-slate-300/30 pointer-events-none">
        <MessageSquare className="w-20 h-20" />
      </div>

      <div className="space-y-4 relative z-10">
        <Stars rating={testimonial.rating} />
        <p className="text-slate-500 text-xs leading-relaxed italic whitespace-pre-line">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-4 relative z-10 flex items-center gap-3">
        <Avatar
          testimonial={testimonial}
          className="w-11 h-11 rounded-full shrink-0 ring-1 ring-slate-200"
          textClassName="text-xs"
        />
        <Attribution testimonial={testimonial} />
      </div>
    </article>
  );
}

/** The larger treatment for hand-picked stories. */
function FeaturedCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row">
      <div className="sm:w-48 shrink-0 bg-[#FAF8F5] border-b sm:border-b-0 sm:border-r border-slate-200 p-6 flex sm:flex-col items-center justify-center gap-4">
        <Avatar
          testimonial={testimonial}
          className="w-24 h-24 rounded-full shrink-0 ring-4 ring-white shadow-md"
          textClassName="text-2xl"
        />
        <div className="sm:text-center">
          <Stars rating={testimonial.rating} className="sm:justify-center" />
          {testimonial.institution && (
            <p className="mt-3 text-[10px] font-bold text-[#124b8d] uppercase tracking-wider leading-snug">
              {testimonial.institution}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-between relative">
        <QuoteIcon className="w-8 h-8 text-slate-200 mb-3" />
        <p className="text-slate-600 text-sm leading-relaxed italic flex-1 whitespace-pre-line">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-6 border-t border-slate-200 pt-4">
          <Attribution testimonial={testimonial} />
        </div>
      </div>
    </article>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
        {eyebrow}
      </span>
      <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#11181C] mb-4">
        {title}
      </h2>
      {description && <p className="text-lg text-slate-500">{description}</p>}
    </div>
  );
}

// --- Page -----------------------------------------------------------------

export default async function TestimonialsPage() {
  // The anon client plus the `is_published` filter: RLS already hides drafts
  // from visitors, and the explicit filter keeps a signed-in admin — who *can*
  // read drafts — from seeing them leak onto the public page.
  const supabase = await createClient();

  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  const testimonials = data ?? [];
  const featured = testimonials.filter((item) => item.is_featured);
  const rest = testimonials.filter((item) => !item.is_featured);

  const institutions = new Set(
    testimonials
      .map((item) => item.institution)
      .filter((value): value is string => Boolean(value))
  ).size;

  const averageRating =
    testimonials.length > 0
      ? (
          testimonials.reduce((total, item) => total + item.rating, 0) /
          testimonials.length
        ).toFixed(1)
      : null;

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">
      <BreadcrumbSchema items={[{ name: "Student Success Stories", path: "/testimonials" }]} />
      {/* Deliberately no Review/AggregateRating markup: Google treats reviews an
          organisation publishes about itself as self-serving and excludes them
          from rich results. The testimonials still render for readers. */}
      <PageHero
        title="Student Success Stories"
        subtitle="Two decades of placements, visas and arrivals — told by the students who lived them."
        breadcrumb="Testimonials"
      />

      {testimonials.length > 0 && (
        <section className="py-8 bg-[#FAF8F5] border-b border-slate-200">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="pt-4 md:pt-0">
                <p className="font-heading text-3xl font-black text-[#124b8d]">
                  {testimonials.length}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                  {testimonials.length === 1
                    ? "Story shared"
                    : "Stories shared"}
                </p>
              </div>
              <div className="pt-4 md:pt-0">
                <p className="font-heading text-3xl font-black text-[#124b8d]">
                  {averageRating}
                  <span className="text-lg text-slate-400"> / 5</span>
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                  Average rating
                </p>
              </div>
              <div className="pt-4 md:pt-0">
                <p className="font-heading text-3xl font-black text-[#124b8d]">
                  {institutions > 0 ? institutions : "—"}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                  Institutions represented
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <SectionIntro
              eyebrow="Featured"
              title="Journeys Worth Reading Twice"
              description="A few students whose path through study, visa and settlement says it best."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featured.map((testimonial) => (
                <FeaturedCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section
          className={cn(
            "py-24 border-t border-slate-200",
            featured.length > 0 ? "bg-[#FAF8F5]/50" : "bg-white"
          )}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <SectionIntro
              eyebrow="Success Stories"
              title={
                featured.length > 0
                  ? "More Students, More Outcomes"
                  : "What Students Say About AEC"
              }
              description="Every story below belongs to a student who walked into an AEC office with a question."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((testimonial) => (
                <StoryCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length === 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-[#FAF8F5] border border-slate-200 rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute -top-6 -right-6 text-slate-300/30 pointer-events-none">
                <MessageSquare className="w-40 h-40" />
              </div>

              <div className="relative z-10 space-y-5">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#124b8d] text-white">
                  <GraduationCap className="w-7 h-7" />
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-[#11181C]">
                  Stories coming soon
                </h2>
                <p className="text-slate-500 leading-relaxed max-w-xl mx-auto">
                  Our students are busy settling into campuses across Australia.
                  We are collecting their stories now — in the meantime, our
                  counsellors would be glad to talk you through the journeys
                  behind them.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#124b8d] hover:bg-[#0e3d72] text-white font-bold h-12 px-8 border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all duration-300"
                  >
                    Talk to a counsellor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Consultation CTA band */}
      <section className="py-24 bg-white overflow-hidden relative border-t border-slate-200">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight text-[#11181C]">
            Your Story Starts Here
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Every story on this page began with a free consultation. Our
            qualified counsellors and MARA registered agents will assess your
            profile and map the pathway that fits.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#124b8d] hover:bg-[#0e3d72] text-white font-bold h-12 px-8 border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all duration-300"
            >
              Book a free consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-[#11181C] font-bold h-12 px-8 transition-all duration-300"
            >
              Explore our services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
