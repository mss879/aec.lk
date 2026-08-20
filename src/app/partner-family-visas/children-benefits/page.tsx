import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { ChildrenBenefitsContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Schooling & Children's Benefits",
  description:
    "Primary, secondary and early-childhood education entitlements for the children of international students in Australia.",
  path: "/partner-family-visas/children-benefits",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Partner & Family Visas", path: "/partner-family-visas" },
          { name: "Schooling & Children's Benefits", path: "/partner-family-visas/children-benefits" },
        ]} />
      <ChildrenBenefitsContent />
    </>
  );
}
