import Image from "next/image";
import { Newspaper } from "lucide-react";
import {
  Badge,
  EmptyState,
  Panel,
  PanelHeader,
  formatDate,
} from "@/components/admin/ui";
import { ActionLink, ViewAllLink } from "./links";
import type { BlogSummary } from "./types";

export function BlogPreview({ summary }: { summary: BlogSummary }) {
  const total = summary.published + summary.drafts;

  return (
    <Panel className="flex flex-col">
      <PanelHeader
        title="Blog"
        description={`${summary.published} published · ${summary.drafts} draft${
          summary.drafts === 1 ? "" : "s"
        }`}
        action={<ViewAllLink href="/admin/blog" />}
      />

      {total === 0 ? (
        <EmptyState
          icon={<Newspaper className="h-5 w-5" />}
          title="Nothing written yet"
          description="Draft an article about visas, courses or student life. Nothing goes public until you set it to published."
          action={
            <ActionLink href="/admin/blog" variant="primary">
              Write the first post
            </ActionLink>
          }
        />
      ) : (
        <ul className="divide-y divide-slate-100">
          {summary.recent.map((post) => (
            <li key={post.id} className="flex items-start gap-3 px-5 py-3">
              {post.cover_image_url ? (
                <Image
                  src={post.cover_image_url}
                  alt=""
                  width={72}
                  height={48}
                  className="h-12 w-[4.5rem] shrink-0 rounded-lg object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex h-12 w-[4.5rem] shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-300"
                >
                  <Newspaper className="h-4 w-4" />
                </span>
              )}

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-bold text-slate-900">
                  {post.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {post.category ? `${post.category} · ` : ""}
                  {formatDate(post.published_at ?? post.created_at)}
                </p>
              </div>

              <Badge tone={post.status === "published" ? "green" : "amber"}>
                {post.status === "published" ? "Published" : "Draft"}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
