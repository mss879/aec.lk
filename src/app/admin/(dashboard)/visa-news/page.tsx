import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  ImageIcon,
  Pencil,
  Pin,
  PinOff,
  Plus,
  ScrollText,
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
import { DeleteNewsButton } from "./delete-news-button";
import { toggleNewsStatusAction, togglePinnedAction } from "./actions";

export const metadata = {
  title: "Student Visa News | AEC Back Office",
};

type StatusFilter = "all" | "published" | "draft";

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
];

function readFilter(value: string | string[] | undefined): StatusFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "published" || raw === "draft" ? raw : "all";
}

export default async function VisaNewsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const filter = readFilter((await searchParams).status);

  const supabase = await createClient();

  // Pinned first, then most recently touched, so the item being worked on and
  // the one deliberately held at the top both stay visible.
  const { data, error } = await supabase
    .from("visa_news")
    .select(
      "id, title, slug, category, status, is_pinned, published_at, effective_date, source_name, cover_image_url, updated_at"
    )
    .order("is_pinned", { ascending: false })
    .order("updated_at", { ascending: false });

  // Falling back to [] silently would render an unreachable database as "No
  // updates yet" — an editor could reasonably conclude their drafts were gone.
  const listFailed = Boolean(error);
  if (error) {
    console.error("[admin/visa-news] failed to load items:", error.message);
  }

  const items = data ?? [];
  const visible =
    filter === "all" ? items : items.filter((item) => item.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Visa News"
        description="Dated policy and processing updates, published to /visa-news."
        action={
          <Link href="/admin/visa-news/new">
            <AdminButton>
              <Plus className="h-4 w-4" />
              New update
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
                ? "/admin/visa-news"
                : `/admin/visa-news?status=${option.value}`
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
              {option.value === "all"
                ? items.length
                : items.filter((item) => item.status === option.value).length}
            </span>
          </Link>
        ))}
      </div>

      {listFailed ? (
        <Panel>
          <div className="p-6 text-sm font-medium text-red-600">
            The updates could not be loaded. This is a connection problem, not an
            empty list — nothing has been deleted. Refresh to try again.
          </div>
        </Panel>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<ScrollText className="h-5 w-5" />}
          title={
            filter === "all" ? "No updates yet" : `No ${filter} updates`
          }
          description="Visa news items are short, dated notes about policy and processing changes — the kind of thing students search for by name."
          action={
            <Link href="/admin/visa-news/new">
              <AdminButton size="sm">
                <Plus className="h-3.5 w-3.5" />
                New update
              </AdminButton>
            </Link>
          }
        />
      ) : (
        <Panel>
          <ul className="divide-y divide-slate-100">
            {visible.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  {item.cover_image_url ? (
                    <Image
                      src={item.cover_image_url}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-slate-300">
                      <ImageIcon className="h-5 w-5" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.is_pinned && <Badge tone="amber">Pinned</Badge>}
                    <Badge
                      tone={item.status === "published" ? "green" : "slate"}
                    >
                      {item.status}
                    </Badge>
                    <Badge tone="blue">{item.category}</Badge>
                  </div>

                  <Link
                    href={`/admin/visa-news/${item.id}`}
                    className="mt-1.5 block truncate text-sm font-bold text-slate-900 hover:text-blue-600"
                  >
                    {item.title}
                  </Link>

                  <p className="mt-0.5 truncate text-[11px] text-slate-400">
                    {item.effective_date
                      ? `Effective ${formatDate(item.effective_date)}`
                      : item.published_at
                        ? `Published ${formatDate(item.published_at)}`
                        : "Not published"}
                    {item.source_name ? ` · ${item.source_name}` : ""}
                    {` · edited ${formatRelative(item.updated_at)}`}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <form action={togglePinnedAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      title={item.is_pinned ? "Unpin" : "Pin to top"}
                      aria-label={item.is_pinned ? "Unpin" : "Pin to top"}
                      className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50"
                    >
                      {item.is_pinned ? (
                        <PinOff className="h-3.5 w-3.5" />
                      ) : (
                        <Pin className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </form>

                  <form action={toggleNewsStatusAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      title={
                        item.status === "published"
                          ? "Move back to draft"
                          : "Publish"
                      }
                      aria-label={
                        item.status === "published"
                          ? "Move back to draft"
                          : "Publish"
                      }
                      className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50"
                    >
                      {item.status === "published" ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </form>

                  <Link
                    href={`/admin/visa-news/${item.id}`}
                    title="Edit"
                    aria-label={`Edit ${item.title}`}
                    className="inline-flex items-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>

                  <DeleteNewsButton id={item.id} title={item.title} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}
