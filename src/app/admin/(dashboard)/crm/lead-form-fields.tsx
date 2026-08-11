"use client";

import { Field, inputClass } from "@/components/admin/ui";
import type { Lead, PipelineStage } from "@/lib/supabase/database.types";
import {
  CURRENCY_OPTIONS,
  PRIORITY_META,
  PRIORITY_OPTIONS,
  STATUS_META,
  STATUS_OPTIONS,
} from "./board-utils";

/**
 * The lead fieldset, shared by the "add lead" modal and the detail drawer so
 * the two can never drift apart. Uncontrolled on purpose — the surrounding
 * `<form action={serverAction}>` reads everything straight off FormData.
 */
export function LeadFormFields({
  stages,
  lead,
  defaultStageId,
  /** Status only makes sense once a lead exists. */
  showStatus = false,
  idPrefix,
}: {
  stages: PipelineStage[];
  lead?: Lead;
  defaultStageId?: string;
  showStatus?: boolean;
  idPrefix: string;
}) {
  const stageId = lead?.stage_id ?? defaultStageId ?? stages[0]?.id ?? "";

  return (
    <div className="space-y-4">
      <Field label="Full name" required>
        <input
          id={`${idPrefix}-full-name`}
          name="full_name"
          type="text"
          required
          maxLength={160}
          defaultValue={lead?.full_name ?? ""}
          autoComplete="off"
          className={inputClass}
          placeholder="Priya Sharma"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email">
          <input
            name="email"
            type="email"
            defaultValue={lead?.email ?? ""}
            autoComplete="off"
            className={inputClass}
            placeholder="priya@example.com"
          />
        </Field>

        <Field label="Phone">
          <input
            name="phone"
            type="tel"
            defaultValue={lead?.phone ?? ""}
            autoComplete="off"
            className={inputClass}
            placeholder="+61 4xx xxx xxx"
          />
        </Field>
      </div>

      <Field label="Interest" hint="Course, destination or programme they asked about.">
        <input
          name="interest"
          type="text"
          maxLength={200}
          defaultValue={lead?.interest ?? ""}
          autoComplete="off"
          className={inputClass}
          placeholder="Master of Nursing — Melbourne"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <Field label="Value" hint="Numbers only. Leave blank if unknown.">
            <input
              name="value"
              type="text"
              inputMode="decimal"
              defaultValue={lead?.value !== null && lead?.value !== undefined ? String(lead.value) : ""}
              autoComplete="off"
              className={inputClass}
              placeholder="12000"
            />
          </Field>
        </div>

        <Field label="Currency">
          <select
            name="currency"
            defaultValue={lead?.currency ?? "AUD"}
            className={inputClass}
          >
            {CURRENCY_OPTIONS.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className={showStatus ? "grid gap-4 sm:grid-cols-3" : "grid gap-4 sm:grid-cols-2"}>
        <Field label="Stage">
          <select name="stage_id" defaultValue={stageId} className={inputClass}>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
                {stage.is_default ? " (default)" : ""}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Priority">
          <select
            name="priority"
            defaultValue={lead?.priority ?? "medium"}
            className={inputClass}
          >
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_META[priority].label}
              </option>
            ))}
          </select>
        </Field>

        {showStatus && (
          <Field label="Status">
            <select
              name="status"
              defaultValue={lead?.status ?? "open"}
              className={inputClass}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {STATUS_META[status].label}
                </option>
              ))}
            </select>
          </Field>
        )}
      </div>

      <Field label="Notes">
        <textarea
          name="notes"
          rows={4}
          maxLength={4000}
          defaultValue={lead?.notes ?? ""}
          className={`${inputClass} resize-y`}
          placeholder="Anything the next person picking this up needs to know."
        />
      </Field>
    </div>
  );
}
