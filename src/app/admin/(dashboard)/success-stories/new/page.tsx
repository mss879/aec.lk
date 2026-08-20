import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminButton, PageHeader } from "@/components/admin/ui";
import { GrantForm } from "../grant-form";

export const metadata = {
  title: "New success story | AEC Back Office",
};

export default function NewGrantPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New success story"
        description="A record of an actual visa grant. It stays a draft until consent is recorded."
        action={
          <Link href="/admin/success-stories">
            <AdminButton variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              All stories
            </AdminButton>
          </Link>
        }
      />

      <GrantForm />
    </div>
  );
}
