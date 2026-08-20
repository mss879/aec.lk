import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { PRPathwaysPortalContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "PR Pathways After Study in Australia",
  description:
    "From student visa to permanent residency — visa subclasses, the step-by-step journey and PR categories explained by MARA-registered advisers.",
  path: "/pr-pathways",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Visas & PR", path: "/pr-pathways" },
        ]} />
      <PRPathwaysPortalContent />
    </>
  );
}
