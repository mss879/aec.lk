"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  SquareKanban,
  Quote,
  Newspaper,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/app/admin/auth-actions";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    hint: "Everything at a glance",
  },
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: Inbox,
    hint: "Every form submission",
  },
  {
    name: "CRM",
    href: "/admin/crm",
    icon: SquareKanban,
    hint: "Lead pipeline",
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: Quote,
    hint: "Client stories",
  },
  { name: "Blog", href: "/admin/blog", icon: Newspaper, hint: "Articles" },
] as const;

function isActive(pathname: string, href: string) {
  // "/admin" would otherwise light up on every child route.
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors",
              active
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            <span className="flex-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({
  adminName,
  adminEmail,
  onNavigate,
}: {
  adminName: string;
  adminEmail: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link href="/admin" onClick={onNavigate} className="px-2 pt-2">
        <img
          src="/auseducenter_logo.png"
          alt="Australian Education Centre"
          className="h-12 w-auto object-contain"
        />
        <span className="mt-2 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Back Office
        </span>
      </Link>

      <NavList onNavigate={onNavigate} />

      <div className="mt-auto space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View live site
        </Link>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="truncate text-sm font-bold text-slate-900">
            {adminName}
          </p>
          <p className="truncate text-xs text-slate-500">{adminEmail}</p>

          <form action={signOutAction} className="mt-3">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar({
  adminName,
  adminEmail,
}: {
  adminName: string;
  adminEmail: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <img
          src="/auseducenter_logo.png"
          alt="Australian Education Centre"
          className="h-9 w-auto object-contain"
        />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          className="rounded-lg border border-slate-200 p-2 text-slate-700"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop rail */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarBody adminName={adminName} adminEmail={adminEmail} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-900/40"
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-3 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarBody
              adminName={adminName}
              adminEmail={adminEmail}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
