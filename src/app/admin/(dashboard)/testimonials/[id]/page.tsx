import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  Badge,
  PageHeader,
  Panel,
  PanelHeader,
  formatDateTime,
} from "@/components/admin/ui";
import { updateTestimonialAction } from "../actions";
import { DeleteTestimonialForm } from "../delete-testimonial";
import { TestimonialForm } from "../testimonial-form";

export default async function EditTestimonialPage({
  params,
}: {
  // Route params are a Promise in this version of Next.js.
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!testimonial) notFound();

  // The id travels with the action rather than through a hidden input, so it
  // cannot be tampered with from the client.
  const submitAction = updateTestimonialAction.bind(null, testimonial.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={testimonial.name}
        description={`Last updated ${formatDateTime(testimonial.updated_at)}`}
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

      <div className="flex flex-wrap gap-1.5">
        <Badge tone={testimonial.is_published ? "green" : "slate"}>
          {testimonial.is_published ? "Published" : "Draft"}
        </Badge>
        {testimonial.is_featured && <Badge tone="violet">Featured</Badge>}
        {!testimonial.image_url && <Badge tone="blue">No photo</Badge>}
      </div>

      <TestimonialForm
        submitAction={submitAction}
        testimonial={testimonial}
        submitLabel="Save changes"
      />

      <Panel className="border-red-100">
        <PanelHeader
          title="Delete this testimonial"
          description="The row and its stored photo are removed for good."
        />
        <div className="p-5">
          <DeleteTestimonialForm
            id={testimonial.id}
            name={testimonial.name}
            redirectAfter
          />
        </div>
      </Panel>
    </div>
  );
}
