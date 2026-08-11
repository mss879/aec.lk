import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatReadingTime } from "@/lib/blog";
import {
  AdminButton,
  PageHeader,
  Panel,
  PanelHeader,
  formatDateTime,
} from "@/components/admin/ui";
import { PostForm } from "../post-form";
import { DeletePostButton } from "../delete-post-button";

export const metadata = {
  title: "Edit post | AEC Back Office",
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  const isPublished = post.status === "published";

  return (
    <div className="space-y-6">
      <PageHeader
        title={post.title}
        description={`${isPublished ? `Published ${formatDateTime(post.published_at)}` : "Draft"} · ${formatReadingTime(post.reading_minutes)} · last edited ${formatDateTime(post.updated_at)}`}
        action={
          <>
            <Link href="/admin/blog">
              <AdminButton variant="secondary">
                <ArrowLeft className="h-4 w-4" />
                All posts
              </AdminButton>
            </Link>

            {isPublished && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AdminButton variant="secondary">
                  <ExternalLink className="h-4 w-4" />
                  View post
                </AdminButton>
              </Link>
            )}
          </>
        }
      />

      <PostForm post={post} />

      <Panel className="border-red-200">
        <PanelHeader
          title="Delete this post"
          description="Removes the article and its cover image. This cannot be undone."
          action={<DeletePostButton id={post.id} title={post.title} />}
        />
      </Panel>
    </div>
  );
}
