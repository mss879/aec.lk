"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { deleteImage } from "@/lib/storage";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Server Actions for the testimonials back office.
 *
 * Every one of them starts with `requireAdmin()` — Server Actions answer direct
 * POSTs, not only the buttons in our own UI.
 *
 * Both the admin list and the public page are revalidated after each mutation,
 * because a testimonial is one row rendered in two places.
 */

const ADMIN_PATH = "/admin/testimonials";
const PUBLIC_PATH = "/testimonials";

type TestimonialInsert =
  Database["public"]["Tables"]["testimonials"]["Insert"];

export type TestimonialFieldErrors = Partial<
  Record<"name" | "quote" | "rating" | "position", string>
>;

export type TestimonialFormState = {
  error: string | null;
  fieldErrors: TestimonialFieldErrors;
};

// --- Parsing --------------------------------------------------------------
// No zod in this project, so the validation is written out by hand.

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optional(formData: FormData, key: string): string | null {
  const value = text(formData, key);
  return value.length > 0 ? value : null;
}

function checked(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

type ParseResult =
  | { ok: true; values: TestimonialInsert }
  | { ok: false; state: TestimonialFormState };

function parseTestimonial(formData: FormData): ParseResult {
  const fieldErrors: TestimonialFieldErrors = {};

  const name = text(formData, "name");
  if (!name) {
    fieldErrors.name = "A name is required.";
  } else if (name.length > 120) {
    fieldErrors.name = "Keep the name under 120 characters.";
  }

  const quote = text(formData, "quote");
  if (!quote) {
    fieldErrors.quote = "The quote is required — it is the whole story.";
  } else if (quote.length > 2000) {
    fieldErrors.quote = "Keep the quote under 2,000 characters.";
  }

  const rating = Number.parseInt(text(formData, "rating"), 10);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    fieldErrors.rating = "Pick a rating between 1 and 5 stars.";
  }

  const positionRaw = text(formData, "position");
  const position = positionRaw === "" ? 0 : Number.parseInt(positionRaw, 10);
  if (!Number.isInteger(position) || position < 0 || position > 9999) {
    fieldErrors.position = "Use a whole number between 0 and 9999.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      state: { error: "Please fix the highlighted fields.", fieldErrors },
    };
  }

  // The photo is optional throughout: `ImageUpload` writes empty strings when
  // nothing has been uploaded, which `optional()` turns back into nulls.
  return {
    ok: true,
    values: {
      name,
      role: optional(formData, "role"),
      institution: optional(formData, "institution"),
      location: optional(formData, "location"),
      quote,
      rating,
      image_url: optional(formData, "image_url"),
      image_path: optional(formData, "image_path"),
      is_published: checked(formData, "is_published"),
      is_featured: checked(formData, "is_featured"),
      position,
    },
  };
}

function revalidateTestimonials() {
  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
}

// --- Actions --------------------------------------------------------------

export async function createTestimonialAction(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();

  const parsed = parseTestimonial(formData);
  if (!parsed.ok) return parsed.state;

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(parsed.values);

  if (error) {
    return { error: error.message, fieldErrors: {} };
  }

  revalidateTestimonials();
  // `redirect` throws, so it must sit outside any try/catch.
  redirect(ADMIN_PATH);
}

export async function updateTestimonialAction(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();

  const parsed = parseTestimonial(formData);
  if (!parsed.ok) return parsed.state;

  const supabase = await createClient();

  const { data: existing, error: readError } = await supabase
    .from("testimonials")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  if (readError) return { error: readError.message, fieldErrors: {} };
  if (!existing) {
    return { error: "That testimonial no longer exists.", fieldErrors: {} };
  }

  const { error } = await supabase
    .from("testimonials")
    .update(parsed.values)
    .eq("id", id);

  if (error) {
    return { error: error.message, fieldErrors: {} };
  }

  // The photo was replaced or cleared, so the old object is now an orphan.
  if (existing.image_path && existing.image_path !== parsed.values.image_path) {
    await deleteImage("testimonials", existing.image_path);
  }

  revalidateTestimonials();
  redirect(ADMIN_PATH);
}

export async function deleteTestimonialAction(
  formData: FormData
): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  // Grab the object key before the row disappears with it.
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("testimonials")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  await deleteImage("testimonials", existing?.image_path);

  revalidateTestimonials();

  // Only the editor asks to be sent back; the list page stays where it is.
  if (formData.get("redirect_to")) {
    redirect(ADMIN_PATH);
  }
}

export async function togglePublishedAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();

  // Read the stored value rather than trusting the submitted one, so a stale
  // list page cannot flip a testimonial to the wrong state.
  const { data: existing, error: readError } = await supabase
    .from("testimonials")
    .select("is_published")
    .eq("id", id)
    .maybeSingle();

  if (readError) throw new Error(readError.message);
  if (!existing) return;

  const { error } = await supabase
    .from("testimonials")
    .update({ is_published: !existing.is_published })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidateTestimonials();
}

export async function toggleFeaturedAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();

  const { data: existing, error: readError } = await supabase
    .from("testimonials")
    .select("is_featured")
    .eq("id", id)
    .maybeSingle();

  if (readError) throw new Error(readError.message);
  if (!existing) return;

  const { error } = await supabase
    .from("testimonials")
    .update({ is_featured: !existing.is_featured })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidateTestimonials();
}
