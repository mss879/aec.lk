import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { CourseFinderContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Course Finder",
  description:
    "Match with Australian degrees, diplomas and vocational courses that fit your academic background, budget and long-term career goals.",
  path: "/study-in-australia/course-finder",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Study in Australia", path: "/study-in-australia" },
          { name: "Course Finder", path: "/study-in-australia/course-finder" },
        ]} />
      <CourseFinderContent />
    </>
  );
}
