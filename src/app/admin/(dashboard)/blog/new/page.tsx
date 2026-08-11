import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminButton, PageHeader } from "@/components/admin/ui";
import { PostForm } from "../post-form";

export const metadata = {
  title: "New post | AEC Back Office",
};

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New post"
        description="Drafts stay private until you publish them."
        action={
          <Link href="/admin/blog">
            <AdminButton variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              All posts
            </AdminButton>
          </Link>
        }
      />

      <PostForm />
    </div>
  );
}
