"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
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
import { CONTENT_SYNTAX_HINT, slugify } from "@/lib/blog";
import {
  VISA_NEWS_CATEGORIES,
  type VisaNewsCategory,
  type VisaNewsItem,
  type VisaNewsStatus,
} from "@/lib/supabase/database.types";
import { createNewsAction, updateNewsAction, type NewsFormState } from "./actions";

const INITIAL_STATE: NewsFormState = { status: "idle" };

/** Search engines truncate around these; the counters are guidance, not limits. */
const SEO_TITLE_TARGET = 60;
const SEO_DESCRIPTION_TARGET = 160;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span className="block text-[11px] font-bold text-red-600">{message}</span>
  );
}

function Counter({ value, target }: { value: number; target: number }) {
  return (
    <span
      className={
        value > target
          ? "text-[11px] font-bold text-amber-600"
          : "text-[11px] text-slate-400"
      }
    >
      {value} / {target}
    </span>
  );
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" disabled={pending}>
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? "Saving…" : isEdit ? "Save changes" : "Create update"}
    </AdminButton>
  );
}

export function NewsForm({ item }: { item?: VisaNewsItem }) {
  const isEdit = Boolean(item);

  const updateWithId = updateNewsAction.bind(null, item?.id ?? "");
  const [state, formAction] = useActionState<NewsFormState, FormData>(
    isEdit ? updateWithId : createNewsAction,
    INITIAL_STATE
  );

  // Controlled on purpose: React 19 resets a form once its action settles,
  // which would wipe the body whenever the action returns a validation error.
  const [title, setTitle] = useState(item?.title ?? "");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [summary, setSummary] = useState(item?.summary ?? "");
  const [content, setContent] = useState(item?.content ?? "");
  const [category, setCategory] = useState<VisaNewsCategory>(
    item?.category ?? "Policy Update"
  );
  const [effectiveDate, setEffectiveDate] = useState(item?.effective_date ?? "");
  const [sourceName, setSourceName] = useState(item?.source_name ?? "");
  const [sourceUrl, setSourceUrl] = useState(item?.source_url ?? "");
  const [isPinned, setIsPinned] = useState(item?.is_pinned ?? false);
  const [status, setStatus] = useState<VisaNewsStatus>(item?.status ?? "draft");
  const [seoTitle, setSeoTitle] = useState(item?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    item?.seo_description ?? ""
  );

  // An existing item already has a slug worth protecting; only a new one
  // follows the headline.
  const [slugLocked, setSlugLocked] = useState(isEdit);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="status" value={status} />

      {state.status === "error" && state.message && (
        <FormMessage status="error">{state.message}</FormMessage>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* --- The update itself -------------------------------------- */}
        <div className="space-y-6 lg:col-span-2">
          <Panel>
            <PanelHeader
              title="Update"
              description="Headline, address and the change itself."
            />
            <div className="space-y-5 p-5">
              <div className="space-y-1.5">
                <Field label="Headline" required>
                  <input
                    name="title"
                    value={title}
                    onChange={(event) => {
                      const next = event.target.value;
                      setTitle(next);
                      if (!slugLocked) setSlug(slugify(next));
                    }}
                    required
                    maxLength={200}
                    className={inputClass}
                    placeholder="Student visa application charge rises from 1 July"
                  />
                </Field>
                <FieldError message={state.fieldErrors?.title} />
              </div>

              <div className="space-y-1.5">
                <Field
                  label="Slug"
                  hint={
                    isEdit
                      ? "This update lives at /visa-news/<slug>. Changing it breaks every existing link."
                      : "Derived from the headline as you type. Edit it for a shorter address."
                  }
                >
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 text-xs font-bold text-slate-400">
                      /visa-news/
                    </span>
                    <input
                      name="slug"
                      value={slug}
                      onChange={(event) => {
                        setSlugLocked(true);
                        setSlug(event.target.value);
                      }}
                      onBlur={(event) => setSlug(slugify(event.target.value))}
                      maxLength={120}
                      className={inputClass}
                      placeholder="student-visa-charge-rises-july"
                    />
                  </div>
                </Field>
                <FieldError message={state.fieldErrors?.slug} />
              </div>

              <Field
                label="Summary"
                hint="One or two sentences. Shown on the news listing and used as the fallback meta description."
              >
                <textarea
                  name="summary"
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  rows={3}
                  maxLength={400}
                  className={inputClass}
                  placeholder="What changed, who it affects, and from when."
                />
              </Field>

              <div className="space-y-1.5">
                <Field label="Details" required>
                  <textarea
                    name="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows={16}
                    className={`${inputClass} font-mono text-[13px] leading-relaxed`}
                    placeholder={
                      "State the change plainly in the first line.\n\n## What this means for you\n\n- Who is affected\n- What to do next"
                    }
                  />
                </Field>
                <FieldError message={state.fieldErrors?.content} />

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className={labelClass}>Formatting you can use</p>
                  <ul className="mt-2 space-y-1">
                    {CONTENT_SYNTAX_HINT.map((line) => (
                      <li
                        key={line}
                        className="font-mono text-[11px] text-slate-500"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Source"
              description="Where the announcement came from. Visitors trust a visa update far more when it links back to the official notice."
            />
            <div className="grid gap-5 p-5 sm:grid-cols-2">
              <Field label="Source name">
                <input
                  name="source_name"
                  value={sourceName}
                  onChange={(event) => setSourceName(event.target.value)}
                  maxLength={120}
                  className={inputClass}
                  placeholder="Department of Home Affairs"
                />
              </Field>

              <div className="space-y-1.5">
                <Field label="Source link">
                  <input
                    name="source_url"
                    type="url"
                    value={sourceUrl}
                    onChange={(event) => setSourceUrl(event.target.value)}
                    maxLength={500}
                    className={inputClass}
                    placeholder="https://immi.homeaffairs.gov.au/..."
                  />
                </Field>
                <FieldError message={state.fieldErrors?.source_url} />
              </div>
            </div>
          </Panel>
        </div>

        {/* --- Everything around it ----------------------------------- */}
        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Publishing" />
            <div className="space-y-4 p-5">
              <div className="space-y-2">
                <span className={labelClass}>Status</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["draft", "published"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setStatus(option)}
                      aria-pressed={status === option}
                      className={
                        status === option
                          ? "rounded-xl border border-blue-600 bg-blue-600 px-3 py-2 text-xs font-bold capitalize text-white"
                          : "rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold capitalize text-slate-600 hover:bg-slate-50"
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  Publishing stamps the publish date automatically.
                </p>
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <input
                  type="checkbox"
                  name="is_pinned"
                  checked={isPinned}
                  onChange={(event) => setIsPinned(event.target.checked)}
                  className="mt-0.5 h-4 w-4"
                />
                <span>
                  <span className="block text-xs font-bold text-slate-700">
                    Pin to the top
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    Keeps this update first on the listing regardless of date.
                  </span>
                </span>
              </label>

              <SubmitButton isEdit={isEdit} />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Filing" />
            <div className="space-y-5 p-5">
              <div className="space-y-2">
                <span className={labelClass}>Category</span>
                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as VisaNewsCategory)
                  }
                  className={inputClass}
                >
                  {VISA_NEWS_CATEGORIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <Field
                label="Effective date"
                hint="When the change takes effect — often later than the day it is announced. Leave blank if it applies immediately."
              >
                <input
                  name="effective_date"
                  type="date"
                  value={effectiveDate}
                  onChange={(event) => setEffectiveDate(event.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Cover image" />
            <div className="p-5">
              <ImageUpload
                bucket="visa-news"
                name="cover_image"
                label="Cover"
                hint="Optional. Landscape works best — roughly 1600 × 900."
                initialUrl={item?.cover_image_url ?? null}
                initialPath={item?.cover_image_path ?? null}
              />
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Search appearance"
              description="Leave blank to fall back to the headline and summary."
            />
            <div className="space-y-5 p-5">
              <div className="space-y-1.5">
                <Field label="SEO title">
                  <input
                    name="seo_title"
                    value={seoTitle}
                    onChange={(event) => setSeoTitle(event.target.value)}
                    maxLength={200}
                    className={inputClass}
                  />
                </Field>
                <div className="flex justify-end">
                  <Counter value={seoTitle.length} target={SEO_TITLE_TARGET} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Field label="SEO description">
                  <textarea
                    name="seo_description"
                    value={seoDescription}
                    onChange={(event) => setSeoDescription(event.target.value)}
                    rows={3}
                    maxLength={400}
                    className={inputClass}
                  />
                </Field>
                <div className="flex justify-end">
                  <Counter
                    value={seoDescription.length}
                    target={SEO_DESCRIPTION_TARGET}
                  />
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </form>
  );
}
