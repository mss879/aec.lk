"use server";

import {
  FORM_SOURCES,
  createInquiry,
  validateInquiryInput,
  type InquiryFieldErrors,
} from "@/lib/inquiries";

/**
 * Only async functions may be exported from a `"use server"` module, so the
 * constants below stay private and their client-side twins live in
 * `consultation-form.tsx`. Keep the honeypot name in sync with that file.
 */

/** The form key this page writes under. Metadata lives in `FORM_SOURCES`. */
const SOURCE_FORM = "contact_consultation";

/**
 * Honeypot field name. It is rendered visually hidden, so a human filling in
 * the real form never touches it — but naive spam bots fill in every input they
 * can find. See below for what we do about it.
 */
const HONEYPOT_FIELD = "company_website";

export type ConsultationFormState = {
  status: "idle" | "success" | "error";
  /** Friendly, user-facing sentence. Never a raw database error. */
  message?: string;
  errors?: InquiryFieldErrors;
  /** Echoed back so the success panel can greet them by name. */
  firstName?: string;
  /** Echoed back so the success panel can name what they asked about. */
  interest?: string;
  /**
   * What they typed. React resets an uncontrolled form once the action
   * resolves, so on an error we hand the values back and the inputs re-apply
   * them through `defaultValue` instead of clearing.
   */
  values?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    interest: string;
    message: string;
  };
};

function readValues(formData: FormData) {
  return {
    first_name: String(formData.get("first_name") ?? ""),
    last_name: String(formData.get("last_name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    interest: String(formData.get("interest") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}

/**
 * Handles the "Book Your FREE Consultation" form.
 *
 * Reachable by direct POST like every Server Action, so it re-validates
 * everything and never trusts the shape of what arrives. It is deliberately
 * unauthenticated — anonymous visitors are the whole point — which is why the
 * write goes through the service-role client inside `createInquiry` rather than
 * granting the browser any access to `public.inquiries`.
 */
export async function submitConsultationAction(
  _prevState: ConsultationFormState,
  formData: FormData
): Promise<ConsultationFormState> {
  const values = readValues(formData);

  // Honeypot: anything that filled the hidden field is a bot. We return the
  // ordinary success panel and drop the submission on the floor — telling a
  // spammer they were caught only teaches them to work around the trap.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim().length > 0) {
    return {
      status: "success",
      firstName: values.first_name.trim(),
      interest: values.interest.trim(),
    };
  }

  const source = FORM_SOURCES[SOURCE_FORM];

  const result = validateInquiryInput({
    ...values,
    source_type: "form",
    source_form: SOURCE_FORM,
    source_label: source.label,
    source_page: source.page,
  });

  if (!result.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors: result.errors,
      values,
    };
  }

  try {
    await createInquiry(result.value);
  } catch (error) {
    // The visitor gets a phone number, not a Postgres error string.
    console.error("[contact] failed to store consultation request", error);
    return {
      status: "error",
      message:
        "Something went wrong on our end and your request was not saved. Please try again, or call us on +94 11 5500100.",
      values,
    };
  }

  return {
    status: "success",
    firstName: result.value.first_name,
    interest: result.value.interest ?? "",
  };
}
