import Image from "next/image";
import { Quote } from "lucide-react";
import {
  Badge,
  EmptyState,
  Panel,
  PanelHeader,
  formatDate,
} from "@/components/admin/ui";
import { ActionLink, ViewAllLink } from "./links";
import { initialsOf } from "./format";
import type { TestimonialsSummary } from "./types";

export function TestimonialsPreview({
  summary,
}: {
  summary: TestimonialsSummary;
}) {
  const total = summary.published + summary.drafts;

  return (
    <Panel className="flex flex-col">
      <PanelHeader
        title="Testimonials"
        description={`${summary.published} live · ${summary.drafts} draft${
          summary.drafts === 1 ? "" : "s"
        }`}
        action={<ViewAllLink href="/admin/testimonials" />}
      />

      {total === 0 ? (
        <EmptyState
          icon={<Quote className="h-5 w-5" />}
          title="No student stories yet"
          description="Add a testimonial with a photo, rating and institution, then publish it to show it on the public site."
          action={
            <ActionLink href="/admin/testimonials" variant="primary">
              Add a testimonial
            </ActionLink>
          }
        />
      ) : (
        <ul className="divide-y divide-slate-100">
          {summary.recent.map((testimonial) => (
            <li
              key={testimonial.id}
              className="flex items-center gap-3 px-5 py-3"
            >
              {testimonial.image_url ? (
                <Image
                  src={testimonial.image_url}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500"
                >
                  {initialsOf(testimonial.name)}
                </span>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900">
                  {testimonial.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {testimonial.institution ??
                    `Added ${formatDate(testimonial.created_at)}`}
                </p>
              </div>

              <Badge tone={testimonial.is_published ? "green" : "amber"}>
                {testimonial.is_published ? "Published" : "Draft"}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
