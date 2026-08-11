import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Link versions of the admin buttons. `AdminButton` renders a `<button>`, which
 * is the wrong element for navigation — the dashboard is nothing but
 * navigation, so it needs anchors.
 */

export function ViewAllLink({
  href,
  label = "View all",
}: {
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-50"
    >
      {label}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

const actionVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
} as const;

export function ActionLink({
  href,
  variant = "secondary",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof actionVariants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
        actionVariants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
