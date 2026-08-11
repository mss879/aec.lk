import type { Metadata } from "next";
import { Inbox, Newspaper, Quote, SquareKanban } from "lucide-react";
import { getAdminUser } from "@/lib/supabase/auth";
import { PageHeader, StatCard } from "@/components/admin/ui";
import { loadDashboardSnapshot } from "@/components/admin/dashboard/data";
import { formatAud } from "@/components/admin/dashboard/format";
import { ActionLink } from "@/components/admin/dashboard/links";
import { InquiriesPreview } from "@/components/admin/dashboard/inquiries-preview";
import { PipelinePreview } from "@/components/admin/dashboard/pipeline-preview";
import { TestimonialsPreview } from "@/components/admin/dashboard/testimonials-preview";
import { BlogPreview } from "@/components/admin/dashboard/blog-preview";

export const metadata: Metadata = {
  title: "Dashboard",
};

/**
 * The greeting is rendered on the server, so it has to be pinned to a real
 * timezone — otherwise a UTC host says "good evening" over Sydney lunchtime.
 * This matches the `en-AU` locale the rest of the back office formats with.
 */
const TIME_ZONE = "Australia/Sydney";

function greetingFor(now: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("en-AU", {
      timeZone: TIME_ZONE,
      hour: "numeric",
      hourCycle: "h23",
    }).format(now)
  );

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function todayIn(now: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
}

export default async function AdminDashboardPage() {
  const [admin, snapshot] = await Promise.all([
    getAdminUser(),
    loadDashboardSnapshot(),
  ]);

  const { inquiries, crm, testimonials, blog } = snapshot;

  const now = new Date();
  const firstName = admin?.full_name?.trim().split(/\s+/)[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title={firstName ? `${greetingFor(now)}, ${firstName}` : greetingFor(now)}
        description={`${todayIn(now)} — here is everything across your back office.`}
        action={
          inquiries.unread > 0 ? (
            <ActionLink href="/admin/inquiries" variant="primary">
              Review {inquiries.unread} new{" "}
              {inquiries.unread === 1 ? "inquiry" : "inquiries"}
            </ActionLink>
          ) : undefined
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="New inquiries"
          value={inquiries.unread}
          hint={`${inquiries.lastSevenDays} arrived in the last 7 days · ${inquiries.total} all time`}
          icon={<Inbox className="h-5 w-5" />}
        />
        <StatCard
          label="Open pipeline"
          value={formatAud(crm.openValue)}
          hint={`${crm.open} open · ${crm.won} won · ${crm.lost} lost`}
          icon={<SquareKanban className="h-5 w-5" />}
        />
        <StatCard
          label="Testimonials live"
          value={testimonials.published}
          hint={
            testimonials.drafts > 0
              ? `${testimonials.drafts} still unpublished`
              : "Nothing waiting to be published"
          }
          icon={<Quote className="h-5 w-5" />}
        />
        <StatCard
          label="Posts published"
          value={blog.published}
          hint={
            blog.drafts > 0
              ? `${blog.drafts} draft${blog.drafts === 1 ? "" : "s"} in progress`
              : "No drafts in progress"
          }
          icon={<Newspaper className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <InquiriesPreview summary={inquiries} />
        <PipelinePreview summary={crm} />
        <TestimonialsPreview summary={testimonials} />
        <BlogPreview summary={blog} />
      </div>
    </div>
  );
}
