import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { CredentialsContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Professional Credentials",
  description:
    "MARA registration, PIER-qualified counsellors and institutional accreditations that safeguard your study and migration pathway.",
  path: "/about/credentials",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "About AEC", path: "/about" },
          { name: "Professional Credentials", path: "/about/credentials" },
        ]} />
      <CredentialsContent />
    </>
  );
}
