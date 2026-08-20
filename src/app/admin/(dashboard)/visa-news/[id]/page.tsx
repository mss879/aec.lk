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
import { NewsForm } from "../news-form";
import { DeleteNewsButton } from "../delete-news-button";

export const metadata = {
  title: "Edit visa update | AEC Back Office",
};

export default async function EditVisaNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: item } = await supabase
    .from("visa_news")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!item) notFound();

  const isPublished = item.status === "published";

  return (
    <div className="space-y-6">
      <PageHeader
        title={item.title}
        description={[
          isPublished
            ? `Published ${formatDateTime(item.published_at)}`
            : "Draft",
          item.effective_date
            ? `effective ${formatDate(item.effective_date)}`
            : null,
          `last edited ${formatDateTime(item.updated_at)}`,
        ]
          .filter(Boolean)
          .join(" · ")}
        action={
          <>
            <Link href="/admin/visa-news">
              <AdminButton variant="secondary">
                <ArrowLeft className="h-4 w-4" />
                All updates
              </AdminButton>
            </Link>

            {isPublished && (
              <Link
                href={`/visa-news/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AdminButton variant="secondary">
                  <ExternalLink className="h-4 w-4" />
                  View update
                </AdminButton>
              </Link>
            )}
          </>
        }
      />

      <NewsForm item={item} />

      <Panel className="border-red-200">
        <PanelHeader
          title="Delete this update"
          description="Removes the update and its cover image. This cannot be undone."
          action={
            <DeleteNewsButton id={item.id} title={item.title} redirectAfter />
          }
        />
      </Panel>
    </div>
  );
}
