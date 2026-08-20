import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { WhyStudyInAustraliaContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Why Study in Australia?",
  description:
    "World-ranked universities, post-study work rights, a safe multicultural lifestyle and strong graduate outcomes — why Australia is the destination of choice for Sri Lankan students.",
  path: "/study-in-australia/why-study",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Study in Australia", path: "/study-in-australia" },
          { name: "Why Study in Australia?", path: "/study-in-australia/why-study" },
        ]} />
      <WhyStudyInAustraliaContent />
    </>
  );
}
