"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, ShieldAlert } from "lucide-react";
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
import type { VisaGrant } from "@/lib/supabase/database.types";
import {
  createGrantAction,
  updateGrantAction,
  type GrantFormState,
} from "./actions";

const INITIAL_STATE: GrantFormState = { status: "idle" };

const SEO_TITLE_TARGET = 60;
const SEO_DESCRIPTION_TARGET = 160;

/** The subclasses AEC places students on most; the field stays free text. */
const COMMON_SUBCLASSES = ["500", "485", "482", "407", "189", "190", "491", "600"];

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
      {pending ? "Saving…" : isEdit ? "Save changes" : "Create story"}
    </AdminButton>
  );
}

export function GrantForm({ grant }: { grant?: VisaGrant }) {
  const isEdit = Boolean(grant);

  const updateWithId = updateGrantAction.bind(null, grant?.id ?? "");
  const [state, formAction] = useActionState<GrantFormState, FormData>(
    isEdit ? updateWithId : createGrantAction,
    INITIAL_STATE
  );

  // Controlled on purpose: React 19 resets a form once its action settles,
  // which would wipe the story whenever the action returns a validation error.
  const [studentName, setStudentName] = useState(grant?.student_name ?? "");
  const [slug, setSlug] = useState(grant?.slug ?? "");
  const [nationality, setNationality] = useState(grant?.nationality ?? "");
  const [visaSubclass, setVisaSubclass] = useState(grant?.visa_subclass ?? "");
  const [visaLabel, setVisaLabel] = useState(grant?.visa_label ?? "");
  const [course, setCourse] = useState(grant?.course ?? "");
  const [institution, setInstitution] = useState(grant?.institution ?? "");
  const [destination, setDestination] = useState(
    grant?.destination_country ?? "Australia"
  );
  const [grantDate, setGrantDate] = useState(grant?.grant_date ?? "");
  const [processingDays, setProcessingDays] = useState(
    grant?.processing_days != null ? String(grant.processing_days) : ""
  );
  const [summary, setSummary] = useState(grant?.summary ?? "");
  const [story, setStory] = useState(grant?.story ?? "");
  const [consultant, setConsultant] = useState(grant?.consultant_name ?? "");
  const [consent, setConsent] = useState(grant?.consent_on_file ?? false);
  const [isPublished, setIsPublished] = useState(grant?.is_published ?? false);
  const [isFeatured, setIsFeatured] = useState(grant?.is_featured ?? false);
  const [position, setPosition] = useState(String(grant?.position ?? 0));
  const [seoTitle, setSeoTitle] = useState(grant?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    grant?.seo_description ?? ""
  );

  const [slugLocked, setSlugLocked] = useState(isEdit);

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && state.message && (
        <FormMessage status="error">{state.message}</FormMessage>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* --- The story ---------------------------------------------- */}
        <div className="space-y-6 lg:col-span-2">
          <Panel>
            <PanelHeader
              title="Student"
              description="Use a first name or an initial where the student has not agreed to be fully identified."
            />
            <div className="space-y-5 p-5">
              <div className="space-y-1.5">
                <Field label="Display name" required>
                  <input
                    name="student_name"
                    value={studentName}
                    onChange={(event) => {
                      const next = event.target.value;
                      setStudentName(next);
                      if (!slugLocked) setSlug(slugify(next));
                    }}
                    required
                    maxLength={120}
                    className={inputClass}
                    placeholder="Nimasha P."
                  />
                </Field>
                <FieldError message={state.fieldErrors?.student_name} />
              </div>

              <div className="space-y-1.5">
                <Field
                  label="Slug"
                  hint={
                    isEdit
                      ? "This story lives at /success-stories/<slug>. Changing it breaks every existing link."
                      : "Derived from the name as you type. Add the visa or course if two students share a name."
                  }
                >
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 text-xs font-bold text-slate-400">
                      /success-stories/
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
                      placeholder="nimasha-p-subclass-500"
                    />
                  </div>
                </Field>
                <FieldError message={state.fieldErrors?.slug} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nationality">
                  <input
                    name="nationality"
                    value={nationality}
                    onChange={(event) => setNationality(event.target.value)}
                    maxLength={80}
                    className={inputClass}
                    placeholder="Sri Lankan"
                  />
                </Field>

                <Field label="Handled by">
                  <input
                    name="consultant_name"
                    value={consultant}
                    onChange={(event) => setConsultant(event.target.value)}
                    maxLength={120}
                    className={inputClass}
                    placeholder="Counsellor's name"
                  />
                </Field>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="The grant"
              description="These fields are what prospective students scan for, so fill in as many as you can."
            />
            <div className="space-y-5 p-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Field label="Visa subclass" required>
                    <input
                      name="visa_subclass"
                      value={visaSubclass}
                      onChange={(event) => setVisaSubclass(event.target.value)}
                      required
                      list="common-subclasses"
                      maxLength={20}
                      className={inputClass}
                      placeholder="500"
                    />
                  </Field>
                  <datalist id="common-subclasses">
                    {COMMON_SUBCLASSES.map((code) => (
                      <option key={code} value={code} />
                    ))}
                  </datalist>
                  <FieldError message={state.fieldErrors?.visa_subclass} />
                </div>

                <Field
                  label="Visa name"
                  hint="Shown on the card. Leave blank to show just the subclass."
                >
                  <input
                    name="visa_label"
                    value={visaLabel}
                    onChange={(event) => setVisaLabel(event.target.value)}
                    maxLength={120}
                    className={inputClass}
                    placeholder="Student Visa (Subclass 500)"
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Course">
                  <input
                    name="course"
                    value={course}
                    onChange={(event) => setCourse(event.target.value)}
                    maxLength={160}
                    className={inputClass}
                    placeholder="Master of Data Science"
                  />
                </Field>

                <Field label="Institution">
                  <input
                    name="institution"
                    value={institution}
                    onChange={(event) => setInstitution(event.target.value)}
                    maxLength={160}
                    className={inputClass}
                    placeholder="Monash University"
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Destination">
                  <input
                    name="destination_country"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                    maxLength={80}
                    className={inputClass}
                  />
                </Field>

                <Field label="Grant date">
                  <input
                    name="grant_date"
                    type="date"
                    value={grantDate}
                    onChange={(event) => setGrantDate(event.target.value)}
                    className={inputClass}
                  />
                </Field>

                <div className="space-y-1.5">
                  <Field label="Processing days" hint="Lodgement to grant.">
                    <input
                      name="processing_days"
                      type="number"
                      min={0}
                      max={3650}
                      value={processingDays}
                      onChange={(event) => setProcessingDays(event.target.value)}
                      className={inputClass}
                      placeholder="34"
                    />
                  </Field>
                  <FieldError message={state.fieldErrors?.processing_days} />
                </div>
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="The story" />
            <div className="space-y-5 p-5">
              <Field
                label="Card summary"
                hint="One or two sentences. Shown on the listing and used as the fallback meta description."
              >
                <textarea
                  name="summary"
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  rows={3}
                  maxLength={400}
                  className={inputClass}
                  placeholder="Refused once elsewhere, granted in 34 days with a restructured financial file."
                />
              </Field>

              <div className="space-y-1.5">
                <Field label="Full story" required>
                  <textarea
                    name="story"
                    value={story}
                    onChange={(event) => setStory(event.target.value)}
                    rows={16}
                    className={`${inputClass} font-mono text-[13px] leading-relaxed`}
                    placeholder={
                      "What the student wanted, what stood in the way, and what AEC did about it.\n\n## The challenge\n\n## What we did\n\n## The outcome"
                    }
                  />
                </Field>
                <FieldError message={state.fieldErrors?.story} />

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
          <Panel className={consent ? undefined : "border-amber-200"}>
            <PanelHeader title="Consent" />
            <div className="space-y-3 p-5">
              <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <input
                  type="checkbox"
                  name="consent_on_file"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-0.5 h-4 w-4"
                />
                <span>
                  <span className="block text-xs font-bold text-slate-700">
                    Written consent is on file
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    The student has agreed to their name, course and visa
                    outcome appearing publicly.
                  </span>
                </span>
              </label>

              {!consent && (
                <p className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-[11px] font-medium text-amber-700">
                  <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  This story cannot be published until consent is recorded. You
                  can still save it as a draft.
                </p>
              )}
              <FieldError message={state.fieldErrors?.consent_on_file} />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Publishing" />
            <div className="space-y-4 p-5">
              <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={isPublished}
                  onChange={(event) => setIsPublished(event.target.checked)}
                  className="mt-0.5 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-700">
                  Published
                </span>
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={isFeatured}
                  onChange={(event) => setIsFeatured(event.target.checked)}
                  className="mt-0.5 h-4 w-4"
                />
                <span>
                  <span className="block text-xs font-bold text-slate-700">
                    Featured
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    Highlighted at the top of the listing.
                  </span>
                </span>
              </label>

              <Field label="Order" hint="Lower numbers sort first.">
                <input
                  name="position"
                  type="number"
                  min={0}
                  max={9999}
                  value={position}
                  onChange={(event) => setPosition(event.target.value)}
                  className={inputClass}
                />
              </Field>

              <SubmitButton isEdit={isEdit} />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Photo" />
            <div className="p-5">
              <ImageUpload
                bucket="visa-grants"
                name="photo"
                label="Student photo"
                hint="Optional, and only with consent. A square headshot works best."
                initialUrl={grant?.photo_url ?? null}
                initialPath={grant?.photo_path ?? null}
              />
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Search appearance"
              description="Leave blank to fall back to the name and summary."
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
