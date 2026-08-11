"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Star } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";
import {
  AdminButton,
  Field,
  FormMessage,
  Panel,
  PanelHeader,
  inputClass,
  labelClass,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/supabase/database.types";
import type { TestimonialFormState } from "./actions";

const INITIAL_STATE: TestimonialFormState = { error: null, fieldErrors: {} };

/** "Dinuka Perera" → "DP". Used wherever a photo is missing. */
function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Every field is controlled. React resets an uncontrolled form once its action
 * settles, which would wipe everything the moment server validation rejects a
 * submission — holding the draft in state keeps the work on screen.
 */
type Draft = {
  name: string;
  role: string;
  institution: string;
  location: string;
  quote: string;
  rating: number;
  position: string;
  isPublished: boolean;
  isFeatured: boolean;
};

function draftFrom(testimonial?: Testimonial | null): Draft {
  return {
    name: testimonial?.name ?? "",
    role: testimonial?.role ?? "",
    institution: testimonial?.institution ?? "",
    location: testimonial?.location ?? "",
    quote: testimonial?.quote ?? "",
    rating: testimonial?.rating ?? 5,
    position: String(testimonial?.position ?? 0),
    isPublished: testimonial?.is_published ?? true,
    isFeatured: testimonial?.is_featured ?? false,
  };
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span className="block text-[11px] font-medium text-red-600">{message}</span>
  );
}

function RatingPicker({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (rating: number) => void;
  error?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? value;

  return (
    <div className="space-y-1.5">
      <span className={labelClass}>
        Rating<span className="ml-0.5 text-red-500">*</span>
      </span>

      <input type="hidden" name="rating" value={value} />

      <div
        className="flex items-center gap-0.5"
        onMouseLeave={() => setHovered(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(null)}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            aria-pressed={value === star}
            className="rounded-lg p-1 transition-colors hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
          >
            <Star
              className={cn(
                "h-6 w-6 transition-colors",
                star <= shown
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-slate-300"
              )}
            />
          </button>
        ))}
        <span className="ml-2 text-xs font-bold text-slate-500">
          {value} of 5
        </span>
      </div>

      <FieldError message={error} />
    </div>
  );
}

function ToggleRow({
  name,
  checked,
  onChange,
  title,
  description,
}: {
  name: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:bg-slate-50">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="min-w-0">
        <span className="block text-sm font-bold text-slate-900">{title}</span>
        <span className="block text-xs text-slate-500">{description}</span>
      </span>
    </label>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" disabled={pending}>
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? "Saving…" : label}
    </AdminButton>
  );
}

export function TestimonialForm({
  submitAction,
  testimonial,
  submitLabel = "Save testimonial",
}: {
  submitAction: (
    state: TestimonialFormState,
    formData: FormData
  ) => Promise<TestimonialFormState>;
  testimonial?: Testimonial | null;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(submitAction, INITIAL_STATE);
  const [draft, setDraft] = useState<Draft>(() => draftFrom(testimonial));

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((previous) => ({ ...previous, [key]: value }));
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && <FormMessage status="error">{state.error}</FormMessage>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel>
            <PanelHeader
              title="The story"
              description="Who they are, and what they said."
            />

            <div className="space-y-5 p-5">
              <div className="space-y-1.5">
                <Field label="Name" required>
                  <input
                    name="name"
                    value={draft.name}
                    onChange={(event) => update("name", event.target.value)}
                    maxLength={120}
                    required
                    placeholder="Dinuka Perera"
                    className={inputClass}
                  />
                </Field>
                <FieldError message={state.fieldErrors.name} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Course / role" hint="Shown under the name.">
                  <input
                    name="role"
                    value={draft.role}
                    onChange={(event) => update("role", event.target.value)}
                    maxLength={160}
                    placeholder="Master of Data Science"
                    className={inputClass}
                  />
                </Field>

                <Field label="Institution">
                  <input
                    name="institution"
                    value={draft.institution}
                    onChange={(event) =>
                      update("institution", event.target.value)
                    }
                    maxLength={160}
                    placeholder="Monash University"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field
                label="Location"
                hint="Where they are from, or where they live now."
              >
                <input
                  name="location"
                  value={draft.location}
                  onChange={(event) => update("location", event.target.value)}
                  maxLength={160}
                  placeholder="Colombo, Sri Lanka"
                  className={inputClass}
                />
              </Field>

              <div className="space-y-1.5">
                <Field
                  label="Quote"
                  required
                  hint="In the student's own words. Quotation marks are added for you."
                >
                  <textarea
                    name="quote"
                    value={draft.quote}
                    onChange={(event) => update("quote", event.target.value)}
                    rows={7}
                    maxLength={2000}
                    required
                    placeholder="AEC's counselling was game-changing…"
                    className={cn(inputClass, "resize-y leading-relaxed")}
                  />
                </Field>
                <div className="flex items-center justify-between gap-3">
                  <FieldError message={state.fieldErrors.quote} />
                  <span className="ml-auto text-[11px] tabular-nums text-slate-400">
                    {draft.quote.length} / 2000
                  </span>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel>
            <PanelHeader
              title="Photo"
              description="Entirely optional — skip it and we draw an avatar."
            />

            <div className="space-y-4 p-5">
              <ImageUpload
                bucket="testimonials"
                name="image"
                label="Student photo (optional)"
                hint="Leave this empty if you don't have one. JPG, PNG, WebP or AVIF, up to 8MB."
                initialUrl={testimonial?.image_url ?? null}
                initialPath={testimonial?.image_path ?? null}
              />

              <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white"
                >
                  {initialsFor(draft.name)}
                </span>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  With no photo, this initials avatar stands in on the public
                  page. Nothing looks broken or empty.
                </p>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Presentation"
              description="Rating, ordering and visibility."
            />

            <div className="space-y-5 p-5">
              <RatingPicker
                value={draft.rating}
                onChange={(rating) => update("rating", rating)}
                error={state.fieldErrors.rating}
              />

              <div className="space-y-1.5">
                <Field
                  label="Display order"
                  hint="Lower numbers appear first. Ties fall back to newest."
                >
                  <input
                    name="position"
                    type="number"
                    min={0}
                    max={9999}
                    step={1}
                    value={draft.position}
                    onChange={(event) =>
                      update("position", event.target.value)
                    }
                    className={inputClass}
                  />
                </Field>
                <FieldError message={state.fieldErrors.position} />
              </div>

              <div className="space-y-2">
                <ToggleRow
                  name="is_published"
                  checked={draft.isPublished}
                  onChange={(next) => update("isPublished", next)}
                  title="Published"
                  description="Visible to everyone on /testimonials."
                />
                <ToggleRow
                  name="is_featured"
                  checked={draft.isFeatured}
                  onChange={(next) => update("isFeatured", next)}
                  title="Featured"
                  description="Pinned to the highlighted block at the top of the page."
                />
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton label={submitLabel} />
        <Link
          href="/admin/testimonials"
          className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
