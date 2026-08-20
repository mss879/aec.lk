import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { StudyInAustraliaContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Study in Australia",
  description:
    "Courses, universities, scholarships and student visas for Australia, guided by AEC's MARA-registered counsellors in Colombo, Melbourne, Adelaide and Dubai.",
  path: "/study-in-australia",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Study in Australia", path: "/study-in-australia" },
        ]} />
      <StudyInAustraliaContent />
    </>
  );
}
