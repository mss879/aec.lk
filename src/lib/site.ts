/**
 * Single source of truth for anything that has to agree across metadata,
 * structured data, the sitemap and the footer — canonical host, business
 * details, office addresses and social profiles.
 *
 * The URL is overridable so preview deployments don't emit canonical tags
 * pointing at production.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.australianeducationcentre.com.au"
).replace(/\/$/, "");

export const siteName = "Australian Education Centre";

export const siteDescription =
  "Australian Education Centre (AEC) guides students from Sri Lanka to Australia, New Zealand and beyond — course selection, applications, student visas, PR pathways and post-arrival support.";

export const socialProfiles = [
  "https://www.facebook.com/australianeducationcentre",
  "https://www.instagram.com/australian_edu",
  "https://www.tiktok.com/@australianeducentre",
];

export const offices = [
  {
    name: "Australian Education Centre (Pvt) Ltd — Head Office",
    street: "No. 421/1/1, Thimbirigasyaya Road",
    locality: "Colombo 05",
    region: "Western Province",
    postalCode: "00500",
    country: "LK",
    phone: "+94115500100",
    email: "edu@multinational.com.au",
  },
  {
    name: "Australian Education Centre — Melbourne",
    street: "Unit 1/11-15 Rocklea Drive, Port Melbourne",
    locality: "Melbourne",
    region: "VIC",
    postalCode: "3207",
    country: "AU",
    phone: "+61489980366",
    email: "melbourne@multinational.com.au",
  },
  {
    name: "Australian Education Centre — Adelaide",
    street: "Level 1, 90 King William Street",
    locality: "Adelaide",
    region: "SA",
    postalCode: "5000",
    country: "AU",
    phone: "+61489980366",
    email: "adelaide@multinational.com.au",
  },
  {
    name: "Australian Education Centre — Dubai",
    street: "Office 9, Level 17, Boulevard Plaza Tower 1, Downtown Dubai",
    locality: "Dubai",
    region: "Dubai",
    postalCode: "00000",
    country: "AE",
    phone: "+971585960366",
    email: "dubai@multinational.com.au",
  },
] as const;

/**
 * Builds a page's metadata with the canonical URL and Open Graph tags filled
 * in, so every page only has to state what is actually different about it.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/auseducenter_logo.png",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website" as const,
      locale: "en_AU",
      images: [{ url: image, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image],
    },
  };
}
