import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { AboutPortalContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "About AEC",
  description:
    "Two decades of education placement in Australia, NZ & Globally — AEC's story, mission, values and professional credentials.",
  path: "/about",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "About AEC", path: "/about" },
        ]} />
      <AboutPortalContent />
    </>
  );
}
