import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema, FaqSchema } from "@/components/seo/json-ld";
import { StudyInAustraliaFAQsContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Study in Australia FAQs",
  description:
    "Straight answers on Australian student visas, tuition costs, working hours, dependants and PR pathways from AEC's registered migration advisers.",
  path: "/study-in-australia/faqs",
});

/** Mirrors the accordion in page-content.tsx — Google only honours FAQ
 *  markup whose answers are visible on the page. */
const faqs = [
  {
    question: "Why should I choose Australia for higher education?",
    answer: "Australia offers globally recognized qualifications, excellent teaching standards, attractive post-study work opportunities, and a safe, inclusive, multicultural environment that is ideal for learning and growth."
  },
  {
    question: "Is Australia suitable for Sri Lankan students?",
    answer: "Yes. Australia has a very large, established Sri Lankan student and expatriate community. It provides strong support networks, culturally diverse grocery stores and restaurants, and streamlined visa frameworks tailored for South Asian students."
  },
  {
    question: "Can I work while studying in Australia?",
    answer: "Yes. International students on a valid student visa can work part-time during study periods (subject to current visa conditions, which generally allow up to 48 hours per fortnight) and full-time during official course breaks."
  },
  {
    question: "Can studying in Australia lead to Permanent Residency?",
    answer: "Permanent Residency is not guaranteed. However, choosing specific courses that are in high demand on Australia's skilled occupation lists, and studying in designated regional areas can significantly strengthen your eligibility points under current migration frameworks."
  }
] as const;

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Study in Australia", path: "/study-in-australia" },
          { name: "FAQs", path: "/study-in-australia/faqs" },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <StudyInAustraliaFAQsContent />
    </>
  );
}
