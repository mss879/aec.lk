import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { ScholarshipsContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Scholarships for International Students",
  description:
    "Australian university and college scholarships, tuition-fee reductions and eligibility criteria for international students, with application help from AEC.",
  path: "/study-in-australia/scholarships",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Study in Australia", path: "/study-in-australia" },
          { name: "Scholarships for International Students", path: "/study-in-australia/scholarships" },
        ]} />
      <ScholarshipsContent />
    </>
  );
}
