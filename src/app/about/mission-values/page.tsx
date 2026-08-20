import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { MissionValuesContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Our Mission & Values",
  description:
    "The five principles behind AEC's honest, expert international education guidance — and what they mean for the students we place.",
  path: "/about/mission-values",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "About AEC", path: "/about" },
          { name: "Our Mission & Values", path: "/about/mission-values" },
        ]} />
      <MissionValuesContent />
    </>
  );
}
