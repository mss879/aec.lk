"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { deleteImage } from "@/lib/storage";
import { parseTags, slugify } from "@/lib/blog";
import type { BlogStatus } from "@/lib/supabase/database.types";

/**
 * Server Actions for the blog back office.
 *
 * Every export starts with `await requireAdmin()` — Server Actions are plain
 * POST endpoints, so the UI never being reachable is not a defence.
 *
 * `published_at` and `reading_minutes` are deliberately never written here: a
 * database trigger (`prepare_blog_post`) owns both.
 */

export type PostFieldError = "title" | "slug" | "content";

export type PostFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Partial<Record<PostFieldError, string>>;
};

/** Postgres unique_violation — the `blog_posts.slug` index. */
const UNIQUE_VIOLATION = "23505";

const SLUG_TAKEN = "That slug is already in use";

type PostPayload = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  cover_image_path: string | null;
  author_name: string | null;
  category: string | null;
  tags: string[];
  status: BlogStatus;
  seo_title: string | null;
  seo_description: string | null;
};

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalText(formData: FormData, key: string): string | null {
  const value = text(formData, key);
  return value.length ? value : null;
}

/**
 * Pulls the editor's fields out of the form and normalises them. Returns the
 * error state directly so both create and update fail the same way.
 */
function readPost(
  formData: FormData
): { ok: true; payload: PostPayload } | { ok: false; state: PostFormState } {
  const fieldErrors: Partial<Record<PostFieldError, string>> = {};

  const title = text(formData, "title");
  if (!title) fieldErrors.title = "Give the post a title.";

  // Whatever the author typed is run through the same slugifier as the live
  // preview, so a hand-edited slug can never be an invalid URL.
  const slug = slugify(text(formData, "slug") || title);
  if (!slug) {
    fieldErrors.slug =
      "Enter a slug, or a title with letters or numbers to build one from.";
  }

  const status: BlogStatus =
    text(formData, "status") === "published" ? "published" : "draft";

  const content = String(formData.get("content") ?? "").trim();
  if (status === "published" && !content) {
    fieldErrors.content = "Add some content before publishing.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      state: {
        status: "error",
        message: "Please fix the highlighted fields.",
        fieldErrors,
      },
    };
  }

  return {
    ok: true,
    payload: {
      title,
      slug,
      excerpt: optionalText(formData, "excerpt"),
      content,
      cover_image_url: optionalText(formData, "cover_image_url"),
      cover_image_path: optionalText(formData, "cover_image_path"),
      author_name: optionalText(formData, "author_name"),
      category: optionalText(formData, "category"),
      tags: parseTags(text(formData, "tags")),
      status,
      seo_title: optionalText(formData, "seo_title"),
      seo_description: optionalText(formData, "seo_description"),
    },
  };
}

/** Refreshes the back office and every public surface a post appears on. */
function revalidatePost(slugs: (string | null | undefined)[]) {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  for (const slug of new Set(slugs.filter(Boolean) as string[])) {
    revalidatePath(`/blog/${slug}`);
  }
}

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdmin();

  const parsed = readPost(formData);
  if (!parsed.ok) return parsed.state;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(parsed.payload)
    .select("id")
    .single();

  if (error || !data) {
    if (error?.code === UNIQUE_VIOLATION) {
      return {
        status: "error",
        message: SLUG_TAKEN,
        fieldErrors: { slug: SLUG_TAKEN },
      };
    }

    return {
      status: "error",
      message: error?.message ?? "The post could not be created.",
    };
  }

  revalidatePost([parsed.payload.slug]);
  revalidatePath(`/admin/blog/${data.id}`);

  // Outside the failure paths above: `redirect` throws to unwind rendering.
  redirect(`/admin/blog/${data.id}`);
}

export async function updatePostAction(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdmin();

  const id = text(formData, "id");
  if (!id) return { status: "error", message: "Missing post id." };

  const parsed = readPost(formData);
  if (!parsed.ok) return parsed.state;

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("slug, cover_image_path")
    .eq("id", id)
    .maybeSingle();

  if (!existing) {
    return { status: "error", message: "That post no longer exists." };
  }

  const { error } = await supabase
    .from("blog_posts")
    .update(parsed.payload)
    .eq("id", id);

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      return {
        status: "error",
        message: SLUG_TAKEN,
        fieldErrors: { slug: SLUG_TAKEN },
      };
    }

    return { status: "error", message: error.message };
  }

  // The new cover was uploaded before the form was submitted, so the old object
  // is only orphaned once the row that referenced it has been updated.
  if (
    existing.cover_image_path &&
    existing.cover_image_path !== parsed.payload.cover_image_path
  ) {
    await deleteImage("blog", existing.cover_image_path);
  }

  revalidatePost([existing.slug, parsed.payload.slug]);
  revalidatePath(`/admin/blog/${id}`);

  return { status: "success", message: "Saved." };
}

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) redirect("/admin/blog");

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("slug, cover_image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    throw new Error(`The post could not be deleted: ${error.message}`);
  }

  await deleteImage("blog", existing?.cover_image_path);

  revalidatePost([existing?.slug]);
  redirect("/admin/blog");
}

/**
 * Flips a post between draft and published. The status is read from the
 * database rather than the form, so a stale list cannot publish by accident.
 */
export async function togglePostStatusAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("slug, status")
    .eq("id", id)
    .maybeSingle();

  if (!existing) return;

  const nextStatus: BlogStatus =
    existing.status === "published" ? "draft" : "published";

  const { error } = await supabase
    .from("blog_posts")
    .update({ status: nextStatus })
    .eq("id", id);

  if (error) {
    throw new Error(`The status could not be changed: ${error.message}`);
  }

  revalidatePost([existing.slug]);
  revalidatePath(`/admin/blog/${id}`);
}
