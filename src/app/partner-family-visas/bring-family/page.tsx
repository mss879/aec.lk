import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { BringFamilyContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Bring Your Partner & Family",
  description:
    "Dependant visa requirements, evidence of relationship and application steps for bringing your spouse and children to Australia.",
  path: "/partner-family-visas/bring-family",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Partner & Family Visas", path: "/partner-family-visas" },
          { name: "Bring Your Partner & Family to Australia", path: "/partner-family-visas/bring-family" },
        ]} />
      <BringFamilyContent />
    </>
  );
}
