import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { CostsInvestmentContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Australian School Costs & Investment",
  description:
    "Tuition fees, accommodation, uniforms and living costs for international school students in Australia, with budget planning guidance.",
  path: "/australian-school-sector/costs",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Australian Schools", path: "/australian-school-sector" },
          { name: "Australian School Costs & Investment", path: "/australian-school-sector/costs" },
        ]} />
      <CostsInvestmentContent />
    </>
  );
}
