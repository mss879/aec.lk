import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { PRCategoriesContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Permanent Residency Categories",
  description:
    "Compare Australian PR subclasses 189, 190, 491 and 186 — points tests, state nomination and employer sponsorship — to find your migration pathway.",
  path: "/pr-pathways/categories",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[
          { name: "Visas & PR", path: "/pr-pathways" },
          { name: "Permanent Residency Categories", path: "/pr-pathways/categories" },
        ]} />
      <PRCategoriesContent />
    </>
  );
}
