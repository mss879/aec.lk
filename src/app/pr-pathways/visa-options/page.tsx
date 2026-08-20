import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { VisaOptionsContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Post-Study Visa Options: 485, 407, 482",
  description:
    "Compare the Temporary Graduate (485), Training (407) and Skills in Demand (482) visas to secure Australian work experience after graduating.",
  path: "/pr-pathways/visa-options",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Visas & PR", path: "/pr-pathways" },
          { name: "Post-Study Visa Options: 485, 407, 482", path: "/pr-pathways/visa-options" },
        ]} />
      <VisaOptionsContent />
    </>
  );
}
