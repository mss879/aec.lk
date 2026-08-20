import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { PartnerWorkRightsContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Partner's Work Rights in Australia",
  description:
    "How many hours a dependent partner can work in Australia, what conditions apply by course level, and how to stay compliant with visa rules.",
  path: "/partner-family-visas/work-rights",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Partner & Family Visas", path: "/partner-family-visas" },
          { name: "Partner's Work Rights in Australia", path: "/partner-family-visas/work-rights" },
        ]} />
      <PartnerWorkRightsContent />
    </>
  );
}
