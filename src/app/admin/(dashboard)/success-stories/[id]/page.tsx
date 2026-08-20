import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  AdminButton,
  PageHeader,
  Panel,
  PanelHeader,
  formatDate,
  formatDateTime,
} from "@/components/admin/ui";
import { GrantForm } from "../grant-form";
import { DeleteGrantButton } from "../delete-grant-button";

export const metadata = {
  title: "Edit success story | AEC Back Office",
};

export default async function EditGrantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: grant } = await supabase
    .from("visa_grants")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!grant) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={grant.student_name}
        description={[
          grant.is_published ? "Published" : "Draft",
          `subclass ${grant.visa_subclass}`,
          grant.grant_date ? `granted ${formatDate(grant.grant_date)}` : null,
          `last edited ${formatDateTime(grant.updated_at)}`,
        ]
          .filter(Boolean)
          .join(" · ")}
        action={
          <>
            <Link href="/admin/success-stories">
              <AdminButton variant="secondary">
                <ArrowLeft className="h-4 w-4" />
                All stories
              </AdminButton>
            </Link>

            {grant.is_published && (
              <Link
                href={`/success-stories/${grant.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AdminButton variant="secondary">
                  <ExternalLink className="h-4 w-4" />
                  View story
                </AdminButton>
              </Link>
            )}
          </>
        }
      />

      <GrantForm grant={grant} />

      <Panel className="border-red-200">
        <PanelHeader
          title="Delete this story"
          description="Removes the story and its photo. This cannot be undone."
          action={
            <DeleteGrantButton
              id={grant.id}
              name={grant.student_name}
              redirectAfter
            />
          }
        />
      </Panel>
    </div>
  );
}
