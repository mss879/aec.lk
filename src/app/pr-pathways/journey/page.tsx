import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { PRJourneyContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Step-by-Step Journey to PR",
  description:
    "The chronological milestones from an Australian student visa to permanent residency — timelines, requirements and decision points at each stage.",
  path: "/pr-pathways/journey",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Visas & PR", path: "/pr-pathways" },
          { name: "Step-by-Step Journey to PR", path: "/pr-pathways/journey" },
        ]} />
      <PRJourneyContent />
    </>
  );
}
