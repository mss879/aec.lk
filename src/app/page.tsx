import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { HomeContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Australian Education Centre (AEC) | Study in Australia from Sri Lanka",
  description:
    "Sri Lanka's first MARA-registered agent. 20+ years placing students in Australian universities, colleges and schools — courses, visas, PR pathways and arrival support.",
  path: "/",
});

export default function Page() {
  return <HomeContent />;
}
