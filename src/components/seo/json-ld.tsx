import { siteUrl } from "@/lib/site";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Breadcrumb trail for a page. Pass the segments between the home page and the
 * current page; home is prepended here.
 */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
        })),
      }}
    />
  );
}

/**
 * Question/answer pairs eligible for the FAQ rich result. Google only shows
 * these when the same answers are visible on the page, so keep them in sync
 * with the rendered accordion rather than writing separate copy here.
 */
export function FaqSchema({
  faqs,
}: {
  faqs: readonly { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}

/** A single service AEC offers, tied back to the organization. */
export function ServiceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${siteUrl}${path}`,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: ["LK", "AU", "AE"],
      }}
    />
  );
}
