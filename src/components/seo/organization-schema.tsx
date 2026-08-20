import { offices, siteDescription, siteName, siteUrl, socialProfiles } from "@/lib/site";

/**
 * Site-wide structured data, emitted once from the root layout.
 *
 * `EducationalOrganization` describes the business itself; the nested
 * `department` entries give each office its own address and phone so local
 * search can attach the right branch to the right city. `WebSite` carries the
 * site name Google uses in the blue link line.
 */
export function OrganizationSchema() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        legalName: "Australian Education Centre (Pvt) Ltd",
        alternateName: "AEC",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/auseducenter_logo.png`,
        },
        image: `${siteUrl}/auseducenter_logo.png`,
        description: siteDescription,
        sameAs: socialProfiles,
        address: {
          "@type": "PostalAddress",
          streetAddress: offices[0].street,
          addressLocality: offices[0].locality,
          addressRegion: offices[0].region,
          postalCode: offices[0].postalCode,
          addressCountry: offices[0].country,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: offices[0].phone,
            contactType: "customer service",
            email: offices[0].email,
            areaServed: ["LK", "AU", "AE"],
            availableLanguage: ["en", "si", "ta"],
          },
        ],
        department: offices.map((office) => ({
          "@type": "EducationalOrganization",
          name: office.name,
          telephone: office.phone,
          email: office.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: office.street,
            addressLocality: office.locality,
            addressRegion: office.region,
            postalCode: office.postalCode,
            addressCountry: office.country,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-AU",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
