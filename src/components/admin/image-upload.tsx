"use client";

import { useRef, useState, useTransition } from "react";
import { ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { uploadImageAction } from "@/app/admin/upload-actions";
import type { ImageBucket } from "@/lib/storage";
import { labelClass } from "@/components/admin/ui";

/**
 * Uploads straight to Supabase storage and then carries the resulting URL and
 * object key in hidden inputs, so the surrounding form can stay a plain
 * `<form action={serverAction}>` with no client state to thread through.
 *
 * Fields written: `<name>_url` and `<name>_path`.
 */
export function ImageUpload({
  bucket,
  name,
  label = "Image",
  hint,
  initialUrl = null,
  initialPath = null,
}: {
  bucket: ImageBucket;
  name: string;
  label?: string;
  hint?: string;
  initialUrl?: string | null;
  initialPath?: string | null;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [path, setPath] = useState(initialPath);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setError(null);

    const formData = new FormData();
    formData.set("bucket", bucket);
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.ok) {
        setUrl(result.image.url);
        setPath(result.image.path);
      } else {
        setError(result.error);
      }
    });
  }

  function clear() {
    setUrl(null);
    setPath(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <span className={labelClass}>{label}</span>

      <input type="hidden" name={`${name}_url`} value={url ?? ""} />
      <input type="hidden" name={`${name}_path`} value={path ?? ""} />

      <div className="flex items-start gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
          ) : url ? (
            // Storage URLs are already sized by the uploader; a plain img keeps
            // this component usable before next.config knows the Supabase host.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-5 w-5 text-slate-300" />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              <Upload className="h-3.5 w-3.5" />
              {url ? "Replace image" : "Upload image"}
            </button>

            {url && (
              <button
                type="button"
                onClick={clear}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-400">
            {hint ?? "Optional. JPG, PNG, WebP or AVIF, up to 8MB."}
          </p>

          {error && (
            <p role="alert" className="text-[11px] font-medium text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
