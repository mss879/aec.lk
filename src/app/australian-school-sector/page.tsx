import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { AustralianSchoolSectorPortalContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Australian Schools for Ages 8-18",
  description:
    "Premium Australian school placements for students aged 8-18 — school types, entry years, costs, accommodation and the application process.",
  path: "/australian-school-sector",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Australian Schools", path: "/australian-school-sector" },
        ]} />
      <AustralianSchoolSectorPortalContent />
    </>
  );
}
