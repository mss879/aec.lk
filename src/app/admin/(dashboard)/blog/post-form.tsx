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
import {
  BLOG_CATEGORIES,
  CONTENT_SYNTAX_HINT,
  formatTags,
  isBlogCategory,
  slugify,
} from "@/lib/blog";
import type { BlogPost, BlogStatus } from "@/lib/supabase/database.types";
import {
  createPostAction,
  updatePostAction,
  type PostFormState,
} from "./actions";

const INITIAL_STATE: PostFormState = { status: "idle" };

/** Search engines truncate around these; the counters are guidance, not limits. */
const SEO_TITLE_TARGET = 60;
const SEO_DESCRIPTION_TARGET = 160;

const OTHER_CATEGORY = "__other__";

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
      {pending ? "Saving…" : isEdit ? "Save changes" : "Create post"}
    </AdminButton>
  );
}

export function PostForm({ post }: { post?: BlogPost }) {
  const isEdit = Boolean(post);

  const [state, formAction] = useActionState<PostFormState, FormData>(
    isEdit ? updatePostAction : createPostAction,
    INITIAL_STATE
  );

  // Every editor field is controlled on purpose. React 19 calls `form.reset()`
  // once a form action settles, which would send any uncontrolled field back to
  // its `defaultValue` — losing a whole draft body whenever the action comes
  // back with a validation error (a duplicate slug, say).
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tags, setTags] = useState(formatTags(post?.tags));
  const [authorName, setAuthorName] = useState(post?.author_name ?? "");
  // An existing post already has a slug worth protecting, so only a brand new
  // post follows the title.
  const [slugLocked, setSlugLocked] = useState(isEdit);

  const initialCategory = post?.category ?? "";
  const [categoryChoice, setCategoryChoice] = useState(
    initialCategory && !isBlogCategory(initialCategory)
      ? OTHER_CATEGORY
      : initialCategory
  );
  const [customCategory, setCustomCategory] = useState(
    initialCategory && !isBlogCategory(initialCategory) ? initialCategory : ""
  );

  const [status, setStatus] = useState<BlogStatus>(post?.status ?? "draft");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    post?.seo_description ?? ""
  );

  const category =
    categoryChoice === OTHER_CATEGORY ? customCategory.trim() : categoryChoice;

  return (
    <form action={formAction} className="space-y-6">
      {isEdit && <input type="hidden" name="id" value={post?.id} />}
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="status" value={status} />

      {state.status === "error" && state.message && (
        <FormMessage status="error">{state.message}</FormMessage>
      )}
      {state.status === "success" && state.message && (
        <FormMessage status="success">{state.message}</FormMessage>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* --- The article itself ------------------------------------- */}
        <div className="space-y-6 lg:col-span-2">
          <Panel>
            <PanelHeader
              title="Article"
              description="Title, address and body copy."
            />
            <div className="space-y-5 p-5">
              <div className="space-y-1.5">
                <Field label="Title" required>
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
                    placeholder="Five things to sort before your 2026 intake"
                  />
                </Field>
                <FieldError message={state.fieldErrors?.title} />
              </div>

              <div className="space-y-1.5">
                <Field
                  label="Slug"
                  hint={
                    isEdit
                      ? "The post lives at /blog/<slug>. Changing it breaks every existing link to this post."
                      : "Derived from the title as you type. Edit it if you want a shorter address."
                  }
                >
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 text-xs font-bold text-slate-400">
                      /blog/
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
                      placeholder="five-things-to-sort-before-your-2026-intake"
                    />
                  </div>
                </Field>
                <FieldError message={state.fieldErrors?.slug} />
              </div>

              <Field
                label="Excerpt"
                hint="One or two sentences. Shown on the blog index and used as the fallback meta description."
              >
                <textarea
                  name="excerpt"
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  rows={3}
                  maxLength={400}
                  className={inputClass}
                  placeholder="A short summary of what the reader will get out of this post."
                />
              </Field>

              <div className="space-y-1.5">
                <Field label="Content">
                  <textarea
                    name="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows={22}
                    className={`${inputClass} font-mono text-[13px] leading-relaxed`}
                    placeholder={
                      "Open with a paragraph that earns the read.\n\n## A heading\n\n- A bullet\n- Another bullet\n\n> Something worth quoting."
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
                  Publishing stamps the publish date and reading time
                  automatically.
                </p>
              </div>

              <SubmitButton isEdit={isEdit} />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Cover image" />
            <div className="p-5">
              <ImageUpload
                bucket="blog"
                name="cover_image"
                label="Cover"
                hint="Landscape works best — roughly 1600 × 900. JPG, PNG, WebP or AVIF, up to 8MB."
                initialUrl={post?.cover_image_url ?? null}
                initialPath={post?.cover_image_path ?? null}
              />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Filing" />
            <div className="space-y-5 p-5">
              <div className="space-y-2">
                <span className={labelClass}>Category</span>
                <select
                  value={categoryChoice}
                  onChange={(event) => setCategoryChoice(event.target.value)}
                  className={inputClass}
                >
                  <option value="">No category</option>
                  {BLOG_CATEGORIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value={OTHER_CATEGORY}>Something else…</option>
                </select>

                {categoryChoice === OTHER_CATEGORY && (
                  <input
                    value={customCategory}
                    onChange={(event) => setCustomCategory(event.target.value)}
                    maxLength={60}
                    className={inputClass}
                    placeholder="Type a category"
                  />
                )}
              </div>

              <Field
                label="Tags"
                hint="Comma separated, e.g. student visa, subclass 500, checklist."
              >
                <input
                  name="tags"
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                  className={inputClass}
                  placeholder="student visa, checklist"
                />
              </Field>

              <Field label="Author">
                <input
                  name="author_name"
                  value={authorName}
                  onChange={(event) => setAuthorName(event.target.value)}
                  maxLength={80}
                  className={inputClass}
                  placeholder="AEC Editorial Team"
                />
              </Field>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Search engines"
              description="Leave blank to fall back to the title and excerpt."
            />
            <div className="space-y-5 p-5">
              <div className="space-y-1.5">
                <Field label="SEO title">
                  <input
                    name="seo_title"
                    value={seoTitle}
                    onChange={(event) => setSeoTitle(event.target.value)}
                    maxLength={120}
                    className={inputClass}
                    placeholder={title || "Post title"}
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
                    rows={4}
                    maxLength={320}
                    className={inputClass}
                    placeholder="What a searcher will see under the link."
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
