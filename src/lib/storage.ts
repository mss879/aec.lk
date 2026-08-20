import "server-only";

import { createClient } from "@/lib/supabase/server";

export type ImageBucket = "testimonials" | "blog" | "visa-news" | "visa-grants";

export type UploadedImage = {
  /** Public URL to render. */
  url: string;
  /** Object key inside the bucket — keep it so the file can be deleted later. */
  path: string;
};

const MAX_BYTES = 8 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export class UploadError extends Error {}

/**
 * Uploads an image to a public Supabase storage bucket using the caller's own
 * session, so the storage RLS policies (admins only) still apply.
 */
export async function uploadImage(
  bucket: ImageBucket,
  file: File
): Promise<UploadedImage> {
  if (!file || file.size === 0) {
    throw new UploadError("No file was selected.");
  }

  if (file.size > MAX_BYTES) {
    throw new UploadError("Images must be 8MB or smaller.");
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    throw new UploadError("Use a JPG, PNG, WebP, AVIF or GIF image.");
  }

  const now = new Date();
  const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}.${extension}`;

  const supabase = await createClient();

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false,
  });

  if (error) {
    throw new UploadError(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return { url: publicUrl, path };
}

/**
 * Best-effort cleanup. A leftover file is untidy but harmless, so a failure
 * here must never fail the surrounding mutation.
 */
export async function deleteImage(
  bucket: ImageBucket,
  path: string | null | undefined
): Promise<void> {
  if (!path) return;

  const supabase = await createClient();
  await supabase.storage.from(bucket).remove([path]);
}
