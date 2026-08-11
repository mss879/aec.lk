import Link from "next/link";
import {
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Quote,
  Star,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  Badge,
  EmptyState,
  FormMessage,
  PageHeader,
  Panel,
  PanelHeader,
  StatCard,
  formatDate,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/supabase/database.types";
import { DeleteTestimonialForm } from "./delete-testimonial";
import { toggleFeaturedAction, togglePublishedAction } from "./actions";

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Thumbnail({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.image_url) {
    return (
      // A plain img keeps this working whether or not the Supabase host has
      // been resolved into next.config's remotePatterns for this environment.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={testimonial.image_url}
        alt=""
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500 ring-1 ring-slate-200"
    >
      {initialsFor(testimonial.name)}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" title={`${rating} of 5`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={cn(
            "h-3.5 w-3.5",
            value <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-slate-300"
          )}
        />
      ))}
      <span className="sr-only">{rating} out of 5</span>
    </span>
  );
}

const iconButtonClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900";

export default async function TestimonialsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  const testimonials = data ?? [];
  const published = testimonials.filter((item) => item.is_published).length;
  const featured = testimonials.filter((item) => item.is_featured).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        description="Student stories shown on the public /testimonials page."
        action={
          <>
            <Link
              href="/testimonials"
              target="_blank"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              View public page
            </Link>
            <Link
              href="/admin/testimonials/new"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              New testimonial
            </Link>
          </>
        }
      />

      {error && (
        <FormMessage status="error">
          Could not load testimonials: {error.message}
        </FormMessage>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total"
          value={error ? "—" : testimonials.length}
          hint="Every story, draft or live"
          icon={<Quote className="h-4 w-4" />}
        />
        <StatCard
          label="Published"
          value={error ? "—" : published}
          hint="Visible to visitors"
          icon={<Eye className="h-4 w-4" />}
        />
        <StatCard
          label="Featured"
          value={error ? "—" : featured}
          hint="Pinned to the top block"
          icon={<Sparkles className="h-4 w-4" />}
        />
      </div>

      <Panel className="overflow-hidden">
        <PanelHeader
          title="All testimonials"
          description="Ordered the same way the public page orders them: display order, then newest."
        />

        {testimonials.length === 0 ? (
          // An empty list and a failed read look identical from here, so say
          // which one it was — "no testimonials yet" after a read error would
          // read as data loss.
          <EmptyState
            icon={<Quote className="h-5 w-5" />}
            title={error ? "Could not load testimonials" : "No testimonials yet"}
            description={
              error
                ? "Nothing has been changed — refresh the page to try again."
                : "Add the first student story — a photo is optional."
            }
            action={
              error ? undefined : (
                <Link
                  href="/admin/testimonials/new"
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white transition-colors hover:bg-blue-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New testimonial
                </Link>
              )
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Course &amp; institution</th>
                  <th className="px-5 py-3">Rating</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-center">Order</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {testimonials.map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className="align-top transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <Thumbnail testimonial={testimonial} />
                        <div className="min-w-0">
                          <Link
                            href={`/admin/testimonials/${testimonial.id}`}
                            className="block truncate font-bold text-slate-900 hover:text-blue-600"
                          >
                            {testimonial.name}
                          </Link>
                          {testimonial.location && (
                            <p className="truncate text-xs text-slate-500">
                              {testimonial.location}
                            </p>
                          )}
                          <p className="mt-1 line-clamp-2 max-w-xs text-xs italic text-slate-400">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-700">
                        {testimonial.role ?? "—"}
                      </p>
                      {testimonial.institution && (
                        <p className="mt-0.5 text-xs font-bold text-blue-700">
                          {testimonial.institution}
                        </p>
                      )}
                      <p className="mt-1 text-[11px] text-slate-400">
                        Added {formatDate(testimonial.created_at)}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <Stars rating={testimonial.rating} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge tone={testimonial.is_published ? "green" : "slate"}>
                          {testimonial.is_published ? "Published" : "Draft"}
                        </Badge>
                        {testimonial.is_featured && (
                          <Badge tone="violet">Featured</Badge>
                        )}
                        {!testimonial.image_url && (
                          <Badge tone="blue">No photo</Badge>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-black text-slate-600">
                        {testimonial.position}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <form action={togglePublishedAction}>
                          <input
                            type="hidden"
                            name="id"
                            value={testimonial.id}
                          />
                          <button
                            type="submit"
                            title={
                              testimonial.is_published
                                ? "Unpublish"
                                : "Publish"
                            }
                            className={iconButtonClass}
                          >
                            {testimonial.is_published ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {testimonial.is_published
                                ? "Unpublish"
                                : "Publish"}
                            </span>
                          </button>
                        </form>

                        <form action={toggleFeaturedAction}>
                          <input
                            type="hidden"
                            name="id"
                            value={testimonial.id}
                          />
                          <button
                            type="submit"
                            title={
                              testimonial.is_featured
                                ? "Remove from featured"
                                : "Mark as featured"
                            }
                            className={cn(
                              iconButtonClass,
                              testimonial.is_featured &&
                                "border-violet-200 bg-violet-50 text-violet-600 hover:bg-violet-100 hover:text-violet-700"
                            )}
                          >
                            <Sparkles className="h-4 w-4" />
                            <span className="sr-only">
                              {testimonial.is_featured
                                ? "Remove from featured"
                                : "Mark as featured"}
                            </span>
                          </button>
                        </form>

                        <Link
                          href={`/admin/testimonials/${testimonial.id}`}
                          title="Edit"
                          className={iconButtonClass}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>

                        <DeleteTestimonialForm
                          id={testimonial.id}
                          name={testimonial.name}
                          compact
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
