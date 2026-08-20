import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { UniversitiesCollegesContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Universities & Colleges in Australia",
  description:
    "AEC connects you directly to 25+ Australian universities and 20+ TAFEs, colleges and pathway providers, with placement support at every step.",
  path: "/study-in-australia/universities-colleges",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Study in Australia", path: "/study-in-australia" },
          { name: "Universities & Colleges in Australia", path: "/study-in-australia/universities-colleges" },
        ]} />
      <UniversitiesCollegesContent />
    </>
  );
}
