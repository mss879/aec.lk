import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/admin/ui";
import { createTestimonialAction } from "../actions";
import { TestimonialForm } from "../testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New testimonial"
        description="A name and a quote are all you need — the photo is optional."
        action={
          <Link
            href="/admin/testimonials"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to list
          </Link>
        }
      />

      <TestimonialForm
        submitAction={createTestimonialAction}
        submitLabel="Create testimonial"
      />
    </div>
  );
}
