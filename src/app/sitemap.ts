import type { MetadataRoute } from "next";
import { countries } from "@/data/countries";
import { createClient } from "@/lib/supabase/server";
import { siteUrl } from "@/lib/site";

/**
 * Priorities are relative, so they only need to rank pages against each other:
 * the home page and the money pages first, supporting detail below them, legal
 * copy last.
 */
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },

  { path: "/study-in-australia", priority: 0.9, changeFrequency: "monthly" },
  { path: "/study-in-australia/why-study", priority: 0.7, changeFrequency: "monthly" },
  { path: "/study-in-australia/course-finder", priority: 0.8, changeFrequency: "monthly" },
  { path: "/study-in-australia/short-courses", priority: 0.7, changeFrequency: "monthly" },
  { path: "/study-in-australia/scholarships", priority: 0.8, changeFrequency: "monthly" },
  { path: "/study-in-australia/universities-colleges", priority: 0.8, changeFrequency: "monthly" },
  { path: "/study-in-australia/faqs", priority: 0.6, changeFrequency: "monthly" },

  { path: "/pr-pathways", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pr-pathways/visa-options", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pr-pathways/journey", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pr-pathways/categories", priority: 0.7, changeFrequency: "monthly" },

  { path: "/partner-family-visas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partner-family-visas/bring-family", priority: 0.7, changeFrequency: "monthly" },
  { path: "/partner-family-visas/work-rights", priority: 0.7, changeFrequency: "monthly" },
  { path: "/partner-family-visas/children-benefits", priority: 0.7, changeFrequency: "monthly" },

  { path: "/australian-school-sector", priority: 0.8, changeFrequency: "monthly" },
  { path: "/australian-school-sector/school-types", priority: 0.7, changeFrequency: "monthly" },
  { path: "/australian-school-sector/entry-points", priority: 0.7, changeFrequency: "monthly" },
  { path: "/australian-school-sector/costs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/australian-school-sector/accommodation", priority: 0.7, changeFrequency: "monthly" },

  { path: "/study-worldwide", priority: 0.9, changeFrequency: "monthly" },

  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/pre-departure", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/arrival-settlement", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/career-services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/ielts-pte", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/partner-family", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/parents-resources", priority: 0.7, changeFrequency: "monthly" },

  { path: "/university-tours", priority: 0.7, changeFrequency: "monthly" },

  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about/our-story", priority: 0.5, changeFrequency: "yearly" },
  { path: "/about/mission-values", priority: 0.5, changeFrequency: "yearly" },
  { path: "/about/credentials", priority: 0.6, changeFrequency: "yearly" },

  { path: "/testimonials", priority: 0.7, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/visa-news", priority: 0.8, changeFrequency: "weekly" },
  { path: "/success-stories", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },

  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

/**
 * Blog posts live in Supabase. A sitemap must never be the thing that fails a
 * deploy, so a database that is unreachable at build time costs us the post
 * URLs and nothing else.
 */
async function blogEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, published_at, updated_at")
      .eq("status", "published")
      .not("published_at", "is", null)
      .lte("published_at", new Date().toISOString());

    if (error || !data) return [];

    return data.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at ?? post.published_at ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

/** Published visa news items, same failure posture as blogEntries. */
async function visaNewsEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("visa_news")
      .select("slug, published_at, updated_at")
      .eq("status", "published")
      .not("published_at", "is", null)
      .lte("published_at", new Date().toISOString());

    if (error || !data) return [];

    return data.map((item) => ({
      url: `${siteUrl}/visa-news/${item.slug}`,
      lastModified: new Date(item.updated_at ?? item.published_at ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

/** Published success stories, same failure posture as blogEntries. */
async function successStoryEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("visa_grants")
      .select("slug, updated_at")
      .eq("is_published", true);

    if (error || !data) return [];

    return data.map((story) => ({
      url: `${siteUrl}/success-stories/${story.slug}`,
      lastModified: new Date(story.updated_at ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...countries.map((country) => ({
      url: `${siteUrl}/study-worldwide/${country.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...(await blogEntries()),
    ...(await visaNewsEntries()),
    ...(await successStoryEntries()),
  ];
}
