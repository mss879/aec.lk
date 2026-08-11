import { Badge } from "@/components/admin/ui";
import { SOURCE_TYPE_META, resolveFormSource } from "@/lib/inquiries";
import type { Inquiry } from "@/lib/supabase/database.types";

export type SourceFields = Pick<
  Inquiry,
  "source_type" | "source_form" | "source_label" | "source_page" | "agent_name"
>;

/**
 * The specific origin, under the source-type badge. "Which form was this?" is
 * the question an admin actually has, and the type alone never answers it.
 */
function detailOf(inquiry: SourceFields): string | null {
  if (inquiry.source_type === "ai_agent") {
    return inquiry.agent_name ?? "Unnamed agent";
  }

  return (
    inquiry.source_label ??
    resolveFormSource(inquiry.source_form)?.label ??
    inquiry.source_form
  );
}

export function SourceBadge({ inquiry }: { inquiry: SourceFields }) {
  const meta = SOURCE_TYPE_META[inquiry.source_type];
  const detail = detailOf(inquiry);

  return (
    <div className="space-y-1">
      <Badge tone={meta?.tone ?? "slate"}>
        {meta?.label ?? inquiry.source_type}
      </Badge>
      {detail && (
        <p className="max-w-[16rem] truncate text-xs text-slate-500" title={detail}>
          {detail}
        </p>
      )}
    </div>
  );
}
