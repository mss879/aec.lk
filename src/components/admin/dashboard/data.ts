import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { DashboardSnapshot, FormBreakdown } from "./types";

/**
 * Every figure the dashboard needs, gathered in one parallel burst.
 *
 * Headline numbers use `{ count: 'exact', head: true }` so Postgres counts
 * rows without shipping any. The only queries that read rows are the ones the
 * page actually renders (the "most recent" lists) plus two grouping passes
 * Postgres cannot do for us through PostgREST — those are capped, since a
 * ranked breakdown does not change shape after a couple of thousand rows.
 */

const SAMPLE_LIMIT = 2000;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export async function loadDashboardSnapshot(): Promise<DashboardSnapshot> {
  const supabase = await createClient();
  const weekAgo = new Date(Date.now() - WEEK_MS).toISOString();

  const [
    inquiriesTotal,
    inquiriesUnread,
    inquiriesThisWeek,
    inquiriesFromForms,
    inquiriesFromAgent,
    inquiriesAddedManually,
    inquiriesImported,
    formSample,
    recentInquiries,
    stageRows,
    openLeadSample,
    leadsOpen,
    leadsWon,
    leadsLost,
    testimonialsPublished,
    testimonialsDrafts,
    recentTestimonials,
    postsPublished,
    postsDrafts,
    recentPosts,
  ] = await Promise.all([
    // --- Inquiries --------------------------------------------------------
    supabase.from("inquiries").select("id", { count: "exact", head: true }),
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .gte("created_at", weekAgo),
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("source_type", "form"),
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("source_type", "ai_agent"),
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("source_type", "manual"),
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("source_type", "import"),
    // `source_form` is free text, so the set of keys is unknown up front and
    // has to be tallied in JS rather than asked for by name.
    supabase
      .from("inquiries")
      .select("source_form, source_label")
      .eq("source_type", "form")
      .order("created_at", { ascending: false })
      .limit(SAMPLE_LIMIT),
    supabase
      .from("inquiries")
      .select(
        "id, first_name, last_name, interest, source_type, source_form, source_label, agent_name, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(5),

    // --- CRM --------------------------------------------------------------
    supabase
      .from("pipeline_stages")
      .select("id, name, color, position")
      .order("position", { ascending: true }),
    // Two columns per open lead gives us both the per-stage distribution and
    // the pipeline value from a single round trip.
    supabase
      .from("leads")
      .select("stage_id, value")
      .eq("status", "open")
      // Without an ORDER BY, a capped read returns an arbitrary slice, so the
      // pipeline value and per-stage counts would jitter between refreshes once
      // the board passes SAMPLE_LIMIT. Newest-first keeps the sample stable.
      .order("created_at", { ascending: false })
      .limit(SAMPLE_LIMIT),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "open"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "won"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "lost"),

    // --- Testimonials -----------------------------------------------------
    supabase
      .from("testimonials")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("testimonials")
      .select("id", { count: "exact", head: true })
      .eq("is_published", false),
    supabase
      .from("testimonials")
      .select("id, name, institution, image_url, is_published, created_at")
      .order("created_at", { ascending: false })
      .limit(3),

    // --- Blog -------------------------------------------------------------
    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("blog_posts")
      .select(
        "id, title, category, status, cover_image_url, published_at, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  // --- Which forms are pulling their weight ---------------------------------
  const tally = new Map<string, FormBreakdown>();

  for (const row of formSample.data ?? []) {
    // Group on the label when there is no machine key, otherwise every form
    // that forgot to send `source_form` collapses into one row wearing
    // whichever label happened to arrive first.
    const key = row.source_form ?? row.source_label ?? "unknown";
    const existing = tally.get(key);

    if (existing) {
      existing.count += 1;
    } else {
      tally.set(key, {
        key,
        label: row.source_label ?? row.source_form ?? "Unlabelled form",
        count: 1,
      });
    }
  }

  const topForms = [...tally.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  // --- Where the open leads are sitting -------------------------------------
  const openByStage = new Map<string, number>();
  let openValue = 0;

  for (const lead of openLeadSample.data ?? []) {
    openByStage.set(lead.stage_id, (openByStage.get(lead.stage_id) ?? 0) + 1);
    openValue += lead.value ?? 0;
  }

  return {
    inquiries: {
      total: inquiriesTotal.count ?? 0,
      unread: inquiriesUnread.count ?? 0,
      lastSevenDays: inquiriesThisWeek.count ?? 0,
      bySourceType: {
        form: inquiriesFromForms.count ?? 0,
        ai_agent: inquiriesFromAgent.count ?? 0,
        manual: inquiriesAddedManually.count ?? 0,
        import: inquiriesImported.count ?? 0,
      },
      topForms,
      recent: recentInquiries.data ?? [],
    },
    crm: {
      stages: (stageRows.data ?? []).map((stage) => ({
        id: stage.id,
        name: stage.name,
        color: stage.color,
        openLeads: openByStage.get(stage.id) ?? 0,
      })),
      open: leadsOpen.count ?? 0,
      won: leadsWon.count ?? 0,
      lost: leadsLost.count ?? 0,
      openValue,
    },
    testimonials: {
      published: testimonialsPublished.count ?? 0,
      drafts: testimonialsDrafts.count ?? 0,
      recent: recentTestimonials.data ?? [],
    },
    blog: {
      published: postsPublished.count ?? 0,
      drafts: postsDrafts.count ?? 0,
      recent: recentPosts.data ?? [],
    },
  };
}
