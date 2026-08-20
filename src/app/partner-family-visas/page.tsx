import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { BreadcrumbSchema, FaqSchema } from "@/components/seo/json-ld";
import { PartnerFamilyVisasContent } from "./page-content";

export const metadata: Metadata = pageMetadata({
  title: "Partner & Family Visas for Australia",
  description:
    "Bring your partner and children to Australia while you study — dependant visas, partner work rights and schooling benefits explained.",
  path: "/partner-family-visas",
});

/** Mirrors the accordion in page-content.tsx. */
const faqs = [
  {
    question: "My partner does not speak English. Can they still come?",
    answer: "Yes. Dependent partners on student visas typically do not have a mandatory English language test requirement, depending on your primary course level and current immigration department regulations."
  },
  {
    question: "We are not married. Can my partner accompany me?",
    answer: "Yes, de facto partners may qualify if you can provide solid proof of a genuine and continuing relationship for at least 12 months, or if your relationship is registered in an eligible Australian state or territory."
  },
  {
    question: "Can my parents visit while I study?",
    answer: "Yes. Your parents can apply for a Subclass 600 Visitor Visa to visit you in Australia. While they cannot be included as student dependents, we assist with visitor visa document preparation."
  },
  {
    question: "Can my partner study in Australia too?",
    answer: "Yes, dependent partners can enroll in short courses under 3 months. For longer academic programs, they must apply for their own primary Student Visa (Subclass 500)."
  },
  {
    question: "How much does it cost to add a partner?",
    answer: "Costs include government visa application charges, overseas student health cover (OSHC) family upgrades, medical panel checks, and police clearance logs. Contact us for a detailed breakdown."
  }
] as const;

export default function Page() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Partner & Family Visas", path: "/partner-family-visas" }]} />
      <FaqSchema faqs={faqs} />
      <PartnerFamilyVisasContent />
    </>
  );
}
