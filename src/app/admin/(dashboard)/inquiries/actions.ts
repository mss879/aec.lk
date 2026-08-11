"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { isInquiryStatus } from "@/lib/inquiries";

/**
 * Every action here opens with `requireAdmin()`. Server Actions are reachable
 * by a direct POST, so the UI never being rendered for a signed-out visitor is
 * not on its own a control.
 */

export type InquiryActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/** Cap on the free-text notes field — the column itself is unbounded `text`. */
const NOTES_LIMIT = 5000;

function revalidateInquiry(id: string) {
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function updateInquiryStatusAction(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!id) {
    return { status: "error", message: "Missing inquiry." };
  }

  if (!isInquiryStatus(status)) {
    return { status: "error", message: "That is not a valid status." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("[admin/inquiries] status update failed", error);
    return { status: "error", message: "Could not save the status." };
  }

  revalidateInquiry(id);
  return { status: "success", message: "Status updated." };
}

export async function updateInquiryNotesAction(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const raw = String(formData.get("admin_notes") ?? "").trim();

  if (!id) {
    return { status: "error", message: "Missing inquiry." };
  }

  if (raw.length > NOTES_LIMIT) {
    return {
      status: "error",
      message: `Notes must be ${NOTES_LIMIT} characters or fewer.`,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ admin_notes: raw.length > 0 ? raw : null })
    .eq("id", id);

  if (error) {
    console.error("[admin/inquiries] notes update failed", error);
    return { status: "error", message: "Could not save your notes." };
  }

  revalidateInquiry(id);
  return { status: "success", message: "Notes saved." };
}

/**
 * "Move to CRM". The RPC does the whole job in one transaction — creates the
 * lead in the default stage, stamps the inquiry as converted, and opens the
 * activity timeline — and is idempotent, so a double-click cannot produce two
 * cards.
 */
export async function promoteInquiryAction(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    return { status: "error", message: "Missing inquiry." };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("promote_inquiry_to_lead", {
    p_inquiry_id: id,
  });

  if (error) {
    console.error("[admin/inquiries] promote failed", error);
    return {
      status: "error",
      message: "Could not move this inquiry into the CRM.",
    };
  }

  revalidateInquiry(id);
  revalidatePath("/admin/crm");

  // Outside the error branch on purpose: `redirect` throws a control-flow
  // exception, so it must never sit inside a try/catch that would swallow it.
  redirect("/admin/crm");
}

export async function deleteInquiryAction(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    return { status: "error", message: "Missing inquiry." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);

  if (error) {
    console.error("[admin/inquiries] delete failed", error);
    return { status: "error", message: "Could not delete this inquiry." };
  }

  revalidateInquiry(id);
  redirect("/admin/inquiries");
}
