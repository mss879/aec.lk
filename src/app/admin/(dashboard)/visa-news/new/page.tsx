import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminButton, PageHeader } from "@/components/admin/ui";
import { NewsForm } from "../news-form";

export const metadata = {
  title: "New visa update | AEC Back Office",
};

export default function NewVisaNewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New visa update"
        description="Drafts stay private until you publish them."
        action={
          <Link href="/admin/visa-news">
            <AdminButton variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              All updates
            </AdminButton>
          </Link>
        }
      />

      <NewsForm />
    </div>
  );
}
