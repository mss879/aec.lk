import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { UniversityToursContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "University Exploration Tours",
  description:
    "Exclusive 7-10 day educational tours of Australian universities — see campuses, meet faculty and experience student life before you commit.",
  path: "/university-tours",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "University Exploration Tours", path: "/university-tours" },
        ]} />
      <UniversityToursContent />
    </>
  );
}
