"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { deleteImage } from "@/lib/storage";
import { slugify } from "@/lib/blog";
import {
  VISA_NEWS_CATEGORIES,
  type VisaNewsCategory,
  type VisaNewsStatus,
} from "@/lib/supabase/database.types";

/**
 * Server Actions for the Student Visa News back office.
 *
 * Every export starts with `await requireAdmin()` — Server Actions are plain
 * POST endpoints, so "the button isn't in the UI" is not a defence.
 *
 * `published_at` is never written here: the `prepare_visa_news` trigger owns it.
 */

const ADMIN_PATH = "/admin/visa-news";
const PUBLIC_PATH = "/visa-news";

export type NewsFieldError = "title" | "slug" | "content" | "source_url";

export type NewsFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<NewsFieldError, string>>;
};

/** Postgres unique_violation — the `visa_news.slug` index. */
const UNIQUE_VIOLATION = "23505";

type NewsPayload = {
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  category: VisaNewsCategory;
  effective_date: string | null;
  source_name: string | null;
  source_url: string | null;
  cover_image_url: string | null;
  cover_image_path: string | null;
  is_pinned: boolean;
  status: VisaNewsStatus;
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

function checked(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

function readNews(
  formData: FormData
): { ok: true; payload: NewsPayload } | { ok: false; state: NewsFormState } {
  const fieldErrors: Partial<Record<NewsFieldError, string>> = {};

  const title = text(formData, "title");
  if (!title) fieldErrors.title = "Give the update a headline.";

  // Run through the same slugifier as the live preview, so a hand-edited slug
  // can never become an invalid URL.
  const slug = slugify(text(formData, "slug") || title);
  if (!slug) {
    fieldErrors.slug =
      "Enter a slug, or a headline with letters or numbers to build one from.";
  }

  const content = text(formData, "content");
  if (!content) fieldErrors.content = "Write the update itself.";

  // An official source is the whole point of a news item, so if one is given it
  // has to be a real link rather than a half-typed domain.
  const sourceUrl = optionalText(formData, "source_url");
  if (sourceUrl) {
    try {
      const parsed = new URL(sourceUrl);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        fieldErrors.source_url = "Use an http:// or https:// link.";
      }
    } catch {
      fieldErrors.source_url = "That does not look like a valid URL.";
    }
  }

  if (Object.keys(fieldErrors).length) {
    return {
      ok: false,
      state: {
        status: "error",
        message: "Please fix the highlighted fields.",
        fieldErrors,
      },
    };
  }

  const rawCategory = text(formData, "category");
  const category = (
    VISA_NEWS_CATEGORIES as readonly string[]
  ).includes(rawCategory)
    ? (rawCategory as VisaNewsCategory)
    : "Policy Update";

  return {
    ok: true,
    payload: {
      title,
      slug,
      summary: optionalText(formData, "summary"),
      content,
      category,
      effective_date: optionalText(formData, "effective_date"),
      source_name: optionalText(formData, "source_name"),
      source_url: sourceUrl,
      cover_image_url: optionalText(formData, "cover_image_url"),
      cover_image_path: optionalText(formData, "cover_image_path"),
      is_pinned: checked(formData, "is_pinned"),
      status: text(formData, "status") === "published" ? "published" : "draft",
      seo_title: optionalText(formData, "seo_title"),
      seo_description: optionalText(formData, "seo_description"),
    },
  };
}

function revalidateNews(slug?: string) {
  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
  if (slug) revalidatePath(`${PUBLIC_PATH}/${slug}`);
}

export async function createNewsAction(
  _prev: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  await requireAdmin();

  const parsed = readNews(formData);
  if (!parsed.ok) return parsed.state;

  const supabase = await createClient();
  const { error } = await supabase.from("visa_news").insert(parsed.payload);

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      return {
        status: "error",
        message: "That slug is already in use.",
        fieldErrors: { slug: "Pick a different slug." },
      };
    }
    return { status: "error", message: error.message };
  }

  revalidateNews(parsed.payload.slug);
  // `redirect` throws, so it must sit outside any try/catch.
  redirect(ADMIN_PATH);
}

export async function updateNewsAction(
  id: string,
  _prev: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  await requireAdmin();

  const parsed = readNews(formData);
  if (!parsed.ok) return parsed.state;

  const supabase = await createClient();

  const { data: existing, error: readError } = await supabase
    .from("visa_news")
    .select("cover_image_path, slug")
    .eq("id", id)
    .maybeSingle();

  if (readError) return { status: "error", message: readError.message };
  if (!existing) {
    return { status: "error", message: "That update no longer exists." };
  }

  const { error } = await supabase
    .from("visa_news")
    .update(parsed.payload)
    .eq("id", id);

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      return {
        status: "error",
        message: "That slug is already in use.",
        fieldErrors: { slug: "Pick a different slug." },
      };
    }
    return { status: "error", message: error.message };
  }

  // The image was replaced or cleared, so the old object is now an orphan.
  if (
    existing.cover_image_path &&
    existing.cover_image_path !== parsed.payload.cover_image_path
  ) {
    await deleteImage("visa-news", existing.cover_image_path);
  }

  revalidateNews(parsed.payload.slug);
  // The slug may have moved, so the old URL needs flushing too.
  if (existing.slug !== parsed.payload.slug) {
    revalidatePath(`${PUBLIC_PATH}/${existing.slug}`);
  }
  redirect(ADMIN_PATH);
}

export async function deleteNewsAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // Grab the object key before the row disappears with it.
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("visa_news")
    .select("cover_image_path, slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("visa_news").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await deleteImage("visa-news", existing?.cover_image_path);

  revalidateNews(existing?.slug);

  // Only the editor asks to be sent back; the list page stays put.
  if (formData.get("redirect_to")) {
    redirect(ADMIN_PATH);
  }
}

export async function toggleNewsStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();

  // Read the stored value rather than trusting the submitted one, so a stale
  // list page cannot flip an item to the wrong state.
  const { data: existing, error: readError } = await supabase
    .from("visa_news")
    .select("status, slug")
    .eq("id", id)
    .maybeSingle();

  if (readError) throw new Error(readError.message);
  if (!existing) return;

  const { error } = await supabase
    .from("visa_news")
    .update({
      status: existing.status === "published" ? "draft" : "published",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidateNews(existing.slug);
}

export async function togglePinnedAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();

  const { data: existing, error: readError } = await supabase
    .from("visa_news")
    .select("is_pinned, slug")
    .eq("id", id)
    .maybeSingle();

  if (readError) throw new Error(readError.message);
  if (!existing) return;

  const { error } = await supabase
    .from("visa_news")
    .update({ is_pinned: !existing.is_pinned })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidateNews(existing.slug);
}
