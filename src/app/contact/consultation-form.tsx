"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  submitConsultationAction,
  type ConsultationFormState,
} from "@/app/contact/actions";

/**
 * Must match the honeypot name in `actions.ts`. A `"use server"` module can
 * only export async functions, so the two constants are kept in step by hand.
 */
const HONEYPOT_FIELD = "company_website";

const initialState: ConsultationFormState = { status: "idle" };

/**
 * The option values double as what we store on the inquiry, so the back office
 * shows "PR Pathway Planning" rather than a slug like `pr`.
 */
const INTEREST_OPTIONS = [
  "Study in Australia",
  "Study Worldwide",
  "PR Pathway Planning",
  "Partner & Family Visas",
  "Australian Schools Sector",
  "University Exploration Tours",
  "IELTS & PTE Test Prep",
];

const fieldClass =
  "w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm text-slate-900";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="text-xs font-bold text-[#e31b23]">
      {children}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      size="lg"
      className="bg-[#124b8d] hover:bg-[#0e3d72] text-white rounded-full font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 border-2 border-slate-900 transition-all duration-300 h-12 w-full"
      type="submit"
      disabled={pending}
    >
      {pending ? "Sending your request…" : "Submit Consultation Request"}
    </Button>
  );
}

function ConsultationFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState<ConsultationFormState, FormData>(
    submitConsultationAction,
    initialState
  );

  const errors = state.errors ?? {};
  const values = state.values;

  return (
    <div className="lg:col-span-7 bg-[#FAF8F5] border border-slate-200 p-8 lg:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-bl-full pointer-events-none" />

      {state.status !== "success" ? (
        <div className="space-y-8 relative z-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Consultation Booking
            </span>
            <h2 className="font-heading text-3xl font-bold text-[#11181C] leading-tight">
              Book Your FREE Consultation
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Provide your profile and transcript highlights. A PIER-certified
              advisor will reach out to you within 24 hours.
            </p>
          </div>

          <form className="space-y-6" action={formAction}>
            {/* Honeypot. Positioned off-screen rather than `display:none` so
                bots that skip hidden inputs still take the bait. A real visitor
                never sees or tabs into it — anything in here is spam. */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
            >
              <label htmlFor={HONEYPOT_FIELD}>
                Company website — leave this blank
              </label>
              <input
                id={HONEYPOT_FIELD}
                name={HONEYPOT_FIELD}
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {state.status === "error" && state.message && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-[#e31b23]"
              >
                {state.message}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="first_name"
                  className="text-xs font-bold uppercase text-slate-700"
                >
                  First Name *
                </label>
                <input
                  required
                  id="first_name"
                  name="first_name"
                  defaultValue={values?.first_name ?? ""}
                  aria-invalid={errors.first_name ? true : undefined}
                  aria-describedby={
                    errors.first_name ? "first_name-error" : undefined
                  }
                  className={fieldClass}
                  placeholder="John"
                />
                <FieldError id="first_name-error">
                  {errors.first_name}
                </FieldError>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last_name"
                  className="text-xs font-bold uppercase text-slate-700"
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  defaultValue={values?.last_name ?? ""}
                  aria-invalid={errors.last_name ? true : undefined}
                  aria-describedby={
                    errors.last_name ? "last_name-error" : undefined
                  }
                  className={fieldClass}
                  placeholder="Doe"
                />
                <FieldError id="last_name-error">{errors.last_name}</FieldError>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase text-slate-700"
                >
                  Email Address *
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={values?.email ?? ""}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass}
                  placeholder="john@example.com"
                />
                <FieldError id="email-error">{errors.email}</FieldError>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-xs font-bold uppercase text-slate-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  defaultValue={values?.phone ?? ""}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={fieldClass}
                  placeholder="+94 77 123 4567"
                />
                <FieldError id="phone-error">{errors.phone}</FieldError>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="interest"
                className="text-xs font-bold uppercase text-slate-700"
              >
                I am interested in *
              </label>
              <select
                required
                id="interest"
                name="interest"
                defaultValue={values?.interest ?? ""}
                aria-invalid={errors.interest ? true : undefined}
                aria-describedby={
                  errors.interest ? "interest-error" : undefined
                }
                className={fieldClass}
              >
                <option value="">Select a service focus</option>
                {INTEREST_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError id="interest-error">{errors.interest}</FieldError>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-xs font-bold uppercase text-slate-700"
              >
                Message / Background Profile
              </label>
              <textarea
                rows={4}
                id="message"
                name="message"
                maxLength={5000}
                defaultValue={values?.message ?? ""}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm text-slate-900"
                placeholder="Tell us about your educational background, scores, or visa queries..."
              />
              <FieldError id="message-error">{errors.message}</FieldError>
            </div>

            <SubmitButton />
          </form>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 space-y-6 relative z-10"
        >
          <div className="w-16 h-16 bg-blue-50 text-[#124b8d] rounded-full flex items-center justify-center mx-auto shadow-sm border border-blue-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-[#11181C]">
            Consultation Request Received!
          </h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Thank you, {state.firstName}. Your interest in{" "}
            {state.interest || "studying abroad"} has been logged. One of our
            qualified counselors will contact you shortly via email or phone to
            confirm details.
          </p>
          <Button
            variant="outline"
            className="font-bold rounded-full border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
            onClick={onReset}
          >
            Submit Another Request
          </Button>
        </motion.div>
      )}
    </div>
  );
}

/**
 * `useActionState` has no reset, so "Submit Another Request" remounts the inner
 * component with a fresh key — which clears both the action state and the
 * uncontrolled inputs in one go.
 */
export function ConsultationForm() {
  const [instance, setInstance] = useState(0);

  return (
    <ConsultationFormInner
      key={instance}
      onReset={() => setInstance((n) => n + 1)}
    />
  );
}
