import type { Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Lead, PipelineStage } from "@/lib/supabase/database.types";
import { PipelineBoard } from "./pipeline-board";

export const metadata: Metadata = {
  title: "CRM pipeline",
};

/**
 * The lead pipeline.
 *
 * Everything the board needs is loaded here in two queries — stages in column
 * order, leads in (stage, position) order — and handed to a Client Component
 * that owns the drag-and-drop interaction. Auth is already enforced by the
 * `(dashboard)` layout, and RLS keeps non-admins out of these tables regardless.
 */
export default async function CrmPage() {
  const supabase = await createClient();

  const [stagesResult, leadsResult] = await Promise.all([
    supabase
      .from("pipeline_stages")
      .select("*")
      .order("position", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase
      .from("leads")
      .select("*")
      .order("stage_id", { ascending: true })
      .order("position", { ascending: true })
      .order("created_at", { ascending: true }),
  ]);

  const loadError = stagesResult.error ?? leadsResult.error;

  if (loadError) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
        <div>
          <p className="text-sm font-bold text-red-800">
            The pipeline could not be loaded
          </p>
          <p className="mt-0.5 text-xs text-red-700">{loadError.message}</p>
        </div>
      </div>
    );
  }

  const stages: PipelineStage[] = stagesResult.data ?? [];
  const leads: Lead[] = leadsResult.data ?? [];

  return <PipelineBoard stages={stages} leads={leads} />;
}
