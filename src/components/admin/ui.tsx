import * as React from "react";
import { cn } from "@/lib/utils";

/** Shared building blocks for the back office. Plain, dense, and quiet — the
 *  data is the interesting part, not the chrome. */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action && <div className="flex shrink-0 gap-2">{action}</div>}
    </div>
  );
}

export function Panel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function PanelHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
      <div>
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

const badgeTones = {
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
} as const;

export type BadgeTone = keyof typeof badgeTones;

export function Badge({
  tone = "slate",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ring-inset",
        badgeTones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        {description && (
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        {icon && <span className="text-slate-300">{icon}</span>}
      </div>
      <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </Panel>
  );
}

// --- Form primitives ------------------------------------------------------

export const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-50";

export const labelClass =
  "block text-xs font-bold uppercase tracking-wide text-slate-600";

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className={labelClass}>
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-slate-400">{hint}</span>}
    </label>
  );
}

const buttonVariants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500/40",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400/40",
  danger:
    "border border-red-200 bg-white text-red-600 hover:bg-red-50 focus-visible:ring-red-500/40",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400/40",
} as const;

const buttonSizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
} as const;

export function AdminButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-xl font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  );
}

export function FormMessage({
  status,
  children,
}: {
  status: "error" | "success";
  children: React.ReactNode;
}) {
  return (
    <p
      role={status === "error" ? "alert" : "status"}
      className={cn(
        "rounded-xl px-3.5 py-2.5 text-sm font-medium",
        status === "error"
          ? "bg-red-50 text-red-700"
          : "bg-emerald-50 text-emerald-700"
      )}
    >
      {children}
    </p>
  );
}

// --- Formatting -----------------------------------------------------------

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Renders a relative timestamp inside a Client Component.
 *
 * `formatRelative` reads the clock, so the server's HTML and the client's first
 * render can disagree by a bucket ("2 minutes ago" vs "3 minutes ago") and React
 * reports a hydration mismatch. `suppressHydrationWarning` is the sanctioned
 * escape hatch for exactly this — a text node whose value is legitimately
 * time-dependent. Server Components can call `formatRelative` directly.
 */
export function RelativeTime({
  value,
  className,
  title,
}: {
  value: string | null | undefined;
  className?: string;
  title?: string;
}) {
  return (
    <time
      dateTime={value ?? undefined}
      title={title ?? formatDateTime(value)}
      className={className}
      suppressHydrationWarning
    >
      {formatRelative(value)}
    </time>
  );
}

export function formatRelative(value: string | null | undefined) {
  if (!value) return "—";

  const then = new Date(value).getTime();
  const diffMinutes = Math.round((then - Date.now()) / 60000);
  const formatter = new Intl.RelativeTimeFormat("en-AU", { numeric: "auto" });

  const thresholds: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "minute"],
    [24 * 60, "hour"],
    [30 * 24 * 60, "day"],
    [12 * 30 * 24 * 60, "month"],
  ];

  let amount = diffMinutes;
  let unit: Intl.RelativeTimeFormatUnit = "minute";

  for (const [limit, candidate] of thresholds) {
    if (Math.abs(diffMinutes) < limit) {
      unit = candidate;
      break;
    }
    unit = "year";
  }

  const divisors: Record<string, number> = {
    minute: 1,
    hour: 60,
    day: 24 * 60,
    month: 30 * 24 * 60,
    year: 365 * 24 * 60,
  };

  amount = Math.round(diffMinutes / divisors[unit]);
  return formatter.format(amount, unit);
}
