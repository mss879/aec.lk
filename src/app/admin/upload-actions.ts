"use server";

import { requireAdmin } from "@/lib/supabase/auth";
import {
  uploadImage,
  UploadError,
  type ImageBucket,
  type UploadedImage,
} from "@/lib/storage";

export type UploadResult =
  | { ok: true; image: UploadedImage }
  | { ok: false; error: string };

const BUCKETS: ImageBucket[] = ["testimonials", "blog"];

/**
 * Shared image upload endpoint for the back office, used by both the
 * testimonial editor and the blog editor.
 */
export async function uploadImageAction(
  formData: FormData
): Promise<UploadResult> {
  await requireAdmin();

  const bucket = String(formData.get("bucket") ?? "") as ImageBucket;
  if (!BUCKETS.includes(bucket)) {
    return { ok: false, error: "Unknown image bucket." };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "No file was received." };
  }

  try {
    const image = await uploadImage(bucket, file);
    return { ok: true, image };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof UploadError
          ? error.message
          : "The upload failed. Please try again.",
    };
  }
}
