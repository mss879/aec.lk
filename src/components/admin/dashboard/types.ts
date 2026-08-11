import type {
  BlogStatus,
  SourceType,
} from "@/lib/supabase/database.types";

/**
 * Narrow row shapes for the dashboard previews.
 *
 * Each one mirrors exactly the column list the matching query in `data.ts`
 * selects — the dashboard never pulls a whole row when it only renders four
 * fields of it.
 */

export type RecentInquiry = {
  id: string;
  first_name: string;
  last_name: string | null;
  interest: string | null;
  source_type: SourceType;
  source_form: string | null;
  source_label: string | null;
  agent_name: string | null;
  created_at: string;
};

/** How many inquiries arrived through each channel. Exact, not sampled. */
export type SourceTypeCounts = Record<SourceType, number>;

/** A single website form, ranked by how much traffic it brings in. */
export type FormBreakdown = {
  key: string;
  label: string;
  count: number;
};

export type InquiriesSummary = {
  total: number;
  unread: number;
  lastSevenDays: number;
  bySourceType: SourceTypeCounts;
  topForms: FormBreakdown[];
  recent: RecentInquiry[];
};

export type StageSummary = {
  id: string;
  name: string;
  color: string;
  openLeads: number;
};

export type CrmSummary = {
  stages: StageSummary[];
  open: number;
  won: number;
  lost: number;
  /** Summed `value` of every open lead. Stored per-lead but AUD by default. */
  openValue: number;
};

export type RecentTestimonial = {
  id: string;
  name: string;
  institution: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
};

export type TestimonialsSummary = {
  published: number;
  drafts: number;
  recent: RecentTestimonial[];
};

export type RecentPost = {
  id: string;
  title: string;
  category: string | null;
  status: BlogStatus;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
};

export type BlogSummary = {
  published: number;
  drafts: number;
  recent: RecentPost[];
};

/** Everything the landing tab renders, gathered in one round of queries. */
export type DashboardSnapshot = {
  inquiries: InquiriesSummary;
  crm: CrmSummary;
  testimonials: TestimonialsSummary;
  blog: BlogSummary;
};
