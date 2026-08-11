import Link from "next/link";
import { Inbox, Search, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  FORM_SOURCES,
  FORM_SOURCE_KEYS,
  INQUIRY_STATUSES,
  SOURCE_TYPES,
  SOURCE_TYPE_META,
  inquiryStatusMeta,
  isFormSourceKey,
  isInquiryStatus,
  isSourceType,
} from "@/lib/inquiries";
import type {
  Inquiry,
  InquiryStatus,
  SourceType,
} from "@/lib/supabase/database.types";
import {
  AdminButton,
  Badge,
  EmptyState,
  FormMessage,
  Panel,
  PageHeader,
  formatRelative,
  inputClass,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import { SourceBadge } from "./source-badge";

const PAGE_SIZE = 25;

/** Links that need to look like a secondary button without nesting one in an <a>. */
const linkButtonClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50";

type RawSearchParams = {
  status?: string | string[];
  source?: string | string[];
  form?: string | string[];
  q?: string | string[];
  page?: string | string[];
};

type Filters = {
  status: InquiryStatus | null;
  source: SourceType | null;
  form: string | null;
  q: string;
  page: number;
};

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

/**
 * PostgREST's `or=` filter is delimited by commas and parentheses, and `%`/`*`
 * are its wildcards. supabase-js offers no escape hatch for embedding those
 * inside a value, so they are stripped rather than escaped — the term is matched
 * as a substring anyway, so dropping punctuation costs almost nothing.
 */
function sanitiseSearch(value: string): string {
  return value
    .replace(/[,()*%\\"']/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function readFilters(raw: RawSearchParams): Filters {
  const status = first(raw.status);
  const source = first(raw.source);
  const form = first(raw.form);
  const page = Number.parseInt(first(raw.page), 10);

  return {
    status: isInquiryStatus(status) ? status : null,
    source: isSourceType(source) ? source : null,
    form: form.length > 0 && form.length <= 80 ? form : null,
    q: sanitiseSearch(first(raw.q)),
    page: Number.isFinite(page) && page > 1 ? page : 1,
  };
}

/** Rebuilds the current URL with some filters replaced. Empty values drop out. */
function hrefFor(filters: Filters, override: Partial<Filters> = {}): string {
  const merged = { ...filters, ...override };
  const params = new URLSearchParams();

  if (merged.status) params.set("status", merged.status);
  if (merged.source) params.set("source", merged.source);
  if (merged.form) params.set("form", merged.form);
  if (merged.q) params.set("q", merged.q);
  if (merged.page > 1) params.set("page", String(merged.page));

  const query = params.toString();
  return query ? `/admin/inquiries?${query}` : "/admin/inquiries";
}

function tabClass(active: boolean) {
  return cn(
    "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition-colors",
    active
      ? "border-blue-600 bg-blue-600 text-white"
      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
  );
}

function tabCountClass(active: boolean) {
  return cn(
    "rounded-md px-1.5 py-0.5 text-[10px]",
    active ? "bg-blue-500/40" : "bg-slate-100 text-slate-500"
  );
}

export const metadata = {
  title: "Inquiries",
};

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const filters = readFilters(await searchParams);
  const supabase = await createClient();

  const searchFilter = filters.q
    ? `first_name.ilike.%${filters.q}%,last_name.ilike.%${filters.q}%,email.ilike.%${filters.q}%`
    : null;

  /** Counts for the status tabs honour every filter except the status itself. */
  const countFor = async (status?: InquiryStatus) => {
    let builder = supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true });

    if (filters.source) builder = builder.eq("source_type", filters.source);
    if (filters.form) builder = builder.eq("source_form", filters.form);
    if (searchFilter) builder = builder.or(searchFilter);
    if (status) builder = builder.eq("status", status);

    const { count } = await builder;
    return count ?? 0;
  };

  // Filters must be applied before `.order()`/`.range()` — those return a
  // transform builder, which no longer exposes `.eq()`.
  let rowsQuery = supabase.from("inquiries").select("*", { count: "exact" });

  if (filters.status) rowsQuery = rowsQuery.eq("status", filters.status);
  if (filters.source) rowsQuery = rowsQuery.eq("source_type", filters.source);
  if (filters.form) rowsQuery = rowsQuery.eq("source_form", filters.form);
  if (searchFilter) rowsQuery = rowsQuery.or(searchFilter);

  const from = (filters.page - 1) * PAGE_SIZE;

  const [rowsResult, counts] = await Promise.all([
    rowsQuery
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1),
    Promise.all([
      countFor(),
      ...INQUIRY_STATUSES.map((status) => countFor(status.value)),
    ]),
  ]);

  // A failed query and a genuinely empty table both arrive here as zero rows.
  // Saying "no inquiries yet" in the first case would tell an admin their
  // submissions are gone, so the two are kept visibly distinct.
  const listFailed = Boolean(rowsResult.error);

  if (rowsResult.error) {
    console.error("[admin/inquiries] list query failed", rowsResult.error);
  }

  const [allCount, ...statusCounts] = counts;
  const inquiries: Inquiry[] = rowsResult.data ?? [];
  const matched = rowsResult.count ?? 0;
  const lastPage = Math.max(1, Math.ceil(matched / PAGE_SIZE));
  const hasFilters = Boolean(
    filters.status || filters.source || filters.form || filters.q
  );

  // Show the active form filter even when it is not one we ship a label for —
  // an external integration can post any `source_form` it likes.
  const formOptions: string[] = [...FORM_SOURCE_KEYS];
  if (filters.form && !isFormSourceKey(filters.form)) {
    formOptions.push(filters.form);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inquiries"
        description="Every submission from the website forms and the AI agent intake API, newest first."
      />

      {/* Status tabs. Plain links, so the Back button behaves and the view is
          shareable — the URL is the only state this page has. */}
      <div className="flex flex-wrap gap-2">
        <Link
          href={hrefFor(filters, { status: null, page: 1 })}
          className={tabClass(filters.status === null)}
        >
          All
          <span className={tabCountClass(filters.status === null)}>
            {allCount}
          </span>
        </Link>

        {INQUIRY_STATUSES.map((status, index) => {
          const active = filters.status === status.value;
          return (
            <Link
              key={status.value}
              href={hrefFor(filters, { status: status.value, page: 1 })}
              className={tabClass(active)}
            >
              {status.label}
              <span className={tabCountClass(active)}>
                {statusCounts[index]}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Filter bar: a plain GET form, so there is no client state to hydrate. */}
      <Panel className="p-4">
        <form
          method="get"
          action="/admin/inquiries"
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          {filters.status && (
            <input type="hidden" name="status" value={filters.status} />
          )}

          <label className="flex-1 space-y-1.5">
            <span className="block text-xs font-bold uppercase tracking-wide text-slate-600">
              Search
            </span>
            <span className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                name="q"
                type="search"
                defaultValue={filters.q}
                placeholder="Name or email address"
                className={cn(inputClass, "pl-9")}
              />
            </span>
          </label>

          <label className="space-y-1.5">
            <span className="block text-xs font-bold uppercase tracking-wide text-slate-600">
              Origin
            </span>
            <select
              name="source"
              defaultValue={filters.source ?? ""}
              className={cn(inputClass, "sm:w-44")}
            >
              <option value="">Any origin</option>
              {SOURCE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {SOURCE_TYPE_META[type].label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="block text-xs font-bold uppercase tracking-wide text-slate-600">
              Form
            </span>
            <select
              name="form"
              defaultValue={filters.form ?? ""}
              className={cn(inputClass, "sm:w-56")}
            >
              <option value="">Any form</option>
              {formOptions.map((key) => (
                <option key={key} value={key}>
                  {isFormSourceKey(key) ? FORM_SOURCES[key].label : key}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-2">
            <AdminButton type="submit">Filter</AdminButton>
            {hasFilters && (
              <Link
                href="/admin/inquiries"
                className={cn(linkButtonClass, "h-10 px-4 text-sm")}
              >
                Clear
              </Link>
            )}
          </div>
        </form>
      </Panel>

      {listFailed && (
        <FormMessage status="error">
          The inquiry list could not be loaded, so what you see below is
          incomplete. Reload the page to try again.
        </FormMessage>
      )}

      <Panel>
        {inquiries.length === 0 ? (
          <EmptyState
            icon={<Inbox className="h-6 w-6" />}
            title={
              listFailed
                ? "Inquiries could not be loaded"
                : hasFilters
                  ? "No inquiries match those filters"
                  : "No inquiries yet"
            }
            description={
              listFailed
                ? "This is a problem reaching the database, not an empty inbox. Reload the page, and check the server logs if it keeps happening."
                : hasFilters
                  ? "Try a broader search, or clear the filters to see everything."
                  : "Inquiries arrive on their own: the website forms write here (starting with the free consultation form on /contact), and the AI agent files them through POST /api/inquiries. Nothing to do until the first one lands."
            }
            action={
              hasFilters && !listFailed ? (
                <Link href="/admin/inquiries" className={linkButtonClass}>
                  Clear filters
                </Link>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Interest</th>
                  <th className="px-5 py-3">Source</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => {
                  const status = inquiryStatusMeta(inquiry.status);
                  const fullName = [inquiry.first_name, inquiry.last_name]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <tr key={inquiry.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="font-bold text-slate-900 hover:text-blue-600"
                        >
                          {fullName || "—"}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="block truncate text-slate-700 hover:text-blue-600"
                        >
                          {inquiry.email}
                        </a>
                        {inquiry.phone && (
                          <span className="block text-xs text-slate-500">
                            {inquiry.phone}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {inquiry.interest ?? "—"}
                      </td>
                      <td className="px-5 py-4">
                        <SourceBadge inquiry={inquiry} />
                      </td>
                      <td className="px-5 py-4">
                        <Badge tone={status.tone}>{status.label}</Badge>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500">
                        {formatRelative(inquiry.created_at)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                        >
                          Open
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {matched > PAGE_SIZE && (
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {from + 1}–{Math.min(from + PAGE_SIZE, matched)} of {matched}
          </span>
          <div className="flex gap-2">
            {filters.page > 1 && (
              <Link
                href={hrefFor(filters, { page: filters.page - 1 })}
                className={linkButtonClass}
              >
                Previous
              </Link>
            )}
            {filters.page < lastPage && (
              <Link
                href={hrefFor(filters, { page: filters.page + 1 })}
                className={linkButtonClass}
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
