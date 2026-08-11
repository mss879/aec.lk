import { requireAdmin } from "@/lib/supabase/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

/**
 * Shell for every authenticated back-office page.
 *
 * `/admin/login` deliberately sits outside this route group so it is not
 * wrapped by an auth check that would redirect it to itself.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <AdminSidebar
        adminName={admin.full_name ?? "Administrator"}
        adminEmail={admin.email}
      />
      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
