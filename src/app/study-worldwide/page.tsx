import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { StudyWorldwidePortalContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Study Worldwide: 18+ Global Destinations",
  description:
    "Compare study destinations across the UK, Canada, USA, Europe and Asia — entry requirements, costs and visa routes — including MBBS in Belarus and Georgia.",
  path: "/study-worldwide",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Study Worldwide", path: "/study-worldwide" },
        ]} />
      <StudyWorldwidePortalContent />
    </>
  );
}
