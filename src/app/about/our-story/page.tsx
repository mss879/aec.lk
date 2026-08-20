import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { OurStoryContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "How Australian Education Centre grew into Sri Lanka's first MARA-registered education and migration consultancy over 20+ years.",
  path: "/about/our-story",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "About AEC", path: "/about" },
          { name: "Our Story", path: "/about/our-story" },
        ]} />
      <OurStoryContent />
    </>
  );
}
