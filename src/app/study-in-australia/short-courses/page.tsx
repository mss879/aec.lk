import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { ShortCoursesContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Short & Specialized Courses",
  description:
    "Intensive bootcamps and CRICOS-accredited short courses in Australia — skills-focused programs with fast entry and clear career outcomes.",
  path: "/study-in-australia/short-courses",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Study in Australia", path: "/study-in-australia" },
          { name: "Short & Specialized Courses", path: "/study-in-australia/short-courses" },
        ]} />
      <ShortCoursesContent />
    </>
  );
}
