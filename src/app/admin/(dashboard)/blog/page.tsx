import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ImageIcon, Newspaper, Pencil, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatReadingTime } from "@/lib/blog";
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
import { DeletePostButton } from "./delete-post-button";
import { togglePostStatusAction } from "./actions";

export const metadata = {
  title: "Blog | AEC Back Office",
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

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const filter = readFilter((await searchParams).status);

  const supabase = await createClient();

  // Most recently touched first, so the draft you are working on stays on top.
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, category, status, published_at, reading_minutes, cover_image_url, updated_at"
    )
    .order("updated_at", { ascending: false });

  // Falling back to [] without saying so would render an unreachable database
  // as "No posts yet" — an editor could reasonably conclude their drafts were
  // gone. Distinguish "nothing here" from "could not look".
  const listFailed = Boolean(error);
  if (error) {
    console.error("[admin/blog] failed to load posts:", error.message);
  }

  const posts = data ?? [];
  const counts = {
    all: posts.length,
    published: posts.filter((post) => post.status === "published").length,
    draft: posts.filter((post) => post.status === "draft").length,
  };

  const visible =
    filter === "all" ? posts : posts.filter((post) => post.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog"
        description="Write, publish and retire articles for the public site."
        action={
          <Link href="/admin/blog/new">
            <AdminButton>
              <Plus className="h-4 w-4" />
              New post
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
                ? "/admin/blog"
                : `/admin/blog?status=${option.value}`
            }
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-colors",
              filter === option.value
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {option.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px]",
                filter === option.value
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              )}
            >
              {counts[option.value]}
            </span>
          </Link>
        ))}
      </div>

      <Panel className="overflow-hidden">
        {visible.length === 0 ? (
          <EmptyState
            icon={<Newspaper className="h-5 w-5" />}
            title={
              listFailed
                ? "Posts could not be loaded"
                : posts.length === 0
                  ? "No posts yet"
                  : `No ${filter === "draft" ? "drafts" : "published posts"}`
            }
            description={
              listFailed
                ? "This is a problem reaching the database, not an empty blog. Nothing has been lost — try reloading in a moment."
                : posts.length === 0
                  ? "Write the first article and it will appear on /blog once published."
                  : "Try another filter, or write something new."
            }
            action={
              <Link href="/admin/blog/new">
                <AdminButton size="sm">
                  <Plus className="h-3.5 w-3.5" />
                  New post
                </AdminButton>
              </Link>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-bold">Post</th>
                  <th className="px-5 py-3 font-bold">Category</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold">Published</th>
                  <th className="px-5 py-3 font-bold">Read</th>
                  <th className="px-5 py-3 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((post) => (
                  <tr key={post.id} className="align-middle hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          {post.cover_image_url ? (
                            <Image
                              src={post.cover_image_url}
                              alt=""
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center">
                              <ImageIcon className="h-4 w-4 text-slate-300" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/admin/blog/${post.id}`}
                            className="block truncate font-bold text-slate-900 hover:text-blue-600"
                          >
                            {post.title}
                          </Link>
                          <span className="block truncate text-xs text-slate-400">
                            /blog/{post.slug} · edited{" "}
                            {formatRelative(post.updated_at)}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3">
                      {post.category ? (
                        <Badge tone="violet">{post.category}</Badge>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>

                    <td className="px-5 py-3">
                      <Badge
                        tone={post.status === "published" ? "green" : "amber"}
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </td>

                    <td className="px-5 py-3 text-xs text-slate-500">
                      {formatDate(post.published_at)}
                    </td>

                    <td className="px-5 py-3 text-xs text-slate-500">
                      {formatReadingTime(post.reading_minutes)}
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/blog/${post.id}`}>
                          <AdminButton variant="secondary" size="sm">
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </AdminButton>
                        </Link>

                        <form action={togglePostStatusAction}>
                          <input type="hidden" name="id" value={post.id} />
                          <AdminButton
                            type="submit"
                            variant="secondary"
                            size="sm"
                          >
                            {post.status === "published" ? (
                              <>
                                <EyeOff className="h-3.5 w-3.5" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="h-3.5 w-3.5" />
                                Publish
                              </>
                            )}
                          </AdminButton>
                        </form>

                        <DeletePostButton id={post.id} title={post.title} />
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
