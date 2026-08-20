import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Pencil,
  Plus,
  ShieldAlert,
  Star,
  StampIcon,
  UserRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  AdminButton,
  Badge,
  EmptyState,
  PageHeader,
  Panel,
  formatDate,
  formatRelative,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import { DeleteGrantButton } from "./delete-grant-button";
import {
  toggleGrantFeaturedAction,
  toggleGrantPublishedAction,
} from "./actions";

export const metadata = {
  title: "Visa Grant Success Stories | AEC Back Office",
};

type Filter = "all" | "published" | "draft" | "needs_consent";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
  { value: "needs_consent", label: "Needs consent" },
];

function readFilter(value: string | string[] | undefined): Filter {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "published" || raw === "draft" || raw === "needs_consent"
    ? raw
    : "all";
}

export default async function SuccessStoriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const filter = readFilter((await searchParams).status);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("visa_grants")
    .select(
      "id, student_name, slug, visa_subclass, visa_label, course, institution, grant_date, processing_days, photo_url, consent_on_file, is_published, is_featured, position, updated_at"
    )
    .order("is_featured", { ascending: false })
    .order("position", { ascending: true })
    .order("updated_at", { ascending: false });

  // Falling back to [] silently would render an unreachable database as "No
  // stories yet", which reads as data loss rather than a connection problem.
  const listFailed = Boolean(error);
  if (error) {
    console.error("[admin/success-stories] failed to load:", error.message);
  }

  const stories = data ?? [];

  const matches = (story: (typeof stories)[number], value: Filter) => {
    if (value === "all") return true;
    if (value === "published") return story.is_published;
    if (value === "draft") return !story.is_published;
    return !story.consent_on_file;
  };

  const visible = stories.filter((story) => matches(story, filter));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visa Grant Success Stories"
        description="Real grants, published to /success-stories. A named story needs recorded consent before it can go live."
        action={
          <Link href="/admin/success-stories/new">
            <AdminButton>
              <Plus className="h-4 w-4" />
              New story
            </AdminButton>
          </Link>
        }
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <Link
            key={option.value}
            href={
              option.value === "all"
                ? "/admin/success-stories"
                : `/admin/success-stories?status=${option.value}`
            }
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors",
              filter === option.value
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {option.label}
            <span className="ml-1.5 opacity-60">
              {stories.filter((story) => matches(story, option.value)).length}
            </span>
          </Link>
        ))}
      </div>

      {listFailed ? (
        <Panel>
          <div className="p-6 text-sm font-medium text-red-600">
            The stories could not be loaded. This is a connection problem, not an
            empty list — nothing has been deleted. Refresh to try again.
          </div>
        </Panel>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<StampIcon className="h-5 w-5" />}
          title={filter === "all" ? "No stories yet" : "Nothing in this view"}
          description="A success story records an actual grant — subclass, course, institution and how long it took. It is the most persuasive thing on the site."
          action={
            <Link href="/admin/success-stories/new">
              <AdminButton size="sm">
                <Plus className="h-3.5 w-3.5" />
                New story
              </AdminButton>
            </Link>
          }
        />
      ) : (
        <Panel>
          <ul className="divide-y divide-slate-100">
            {visible.map((story) => (
              <li
                key={story.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                  {story.photo_url ? (
                    <Image
                      src={story.photo_url}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-slate-300">
                      <UserRound className="h-5 w-5" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {story.is_featured && <Badge tone="amber">Featured</Badge>}
                    <Badge tone={story.is_published ? "green" : "slate"}>
                      {story.is_published ? "published" : "draft"}
                    </Badge>
                    <Badge tone="violet">
                      {story.visa_label ?? `Subclass ${story.visa_subclass}`}
                    </Badge>
                    {!story.consent_on_file && (
                      <Badge tone="red">
                        <ShieldAlert className="h-3 w-3" />
                        No consent
                      </Badge>
                    )}
                  </div>

                  <Link
                    href={`/admin/success-stories/${story.id}`}
                    className="mt-1.5 block truncate text-sm font-bold text-slate-900 hover:text-blue-600"
                  >
                    {story.student_name}
                  </Link>

                  <p className="mt-0.5 truncate text-[11px] text-slate-400">
                    {[
                      story.course,
                      story.institution,
                      story.grant_date
                        ? `granted ${formatDate(story.grant_date)}`
                        : null,
                      story.processing_days != null
                        ? `${story.processing_days} days`
                        : null,
                      `edited ${formatRelative(story.updated_at)}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <form action={toggleGrantFeaturedAction}>
                    <input type="hidden" name="id" value={story.id} />
                    <button
                      type="submit"
                      title={story.is_featured ? "Unfeature" : "Feature"}
                      aria-label={story.is_featured ? "Unfeature" : "Feature"}
                      className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50"
                    >
                      <Star
                        className={cn(
                          "h-3.5 w-3.5",
                          story.is_featured && "fill-amber-400 text-amber-500"
                        )}
                      />
                    </button>
                  </form>

                  <form action={toggleGrantPublishedAction}>
                    <input type="hidden" name="id" value={story.id} />
                    <button
                      type="submit"
                      // Publishing without consent is refused by the action and
                      // by the database; disabling it here just avoids the
                      // pointless round trip.
                      disabled={!story.is_published && !story.consent_on_file}
                      title={
                        !story.is_published && !story.consent_on_file
                          ? "Record consent on the edit screen before publishing"
                          : story.is_published
                            ? "Unpublish"
                            : "Publish"
                      }
                      aria-label={story.is_published ? "Unpublish" : "Publish"}
                      className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {story.is_published ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </form>

                  <Link
                    href={`/admin/success-stories/${story.id}`}
                    title="Edit"
                    aria-label={`Edit ${story.student_name}`}
                    className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>

                  <DeleteGrantButton id={story.id} name={story.student_name} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}
