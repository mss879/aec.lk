import type { NextConfig } from "next";

/**
 * Storage-hosted images (testimonial photos, blog covers) live on the Supabase
 * project's domain, which varies per environment — so derive it from the same
 * env var the client uses rather than hard-coding it.
 */
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

/**
 * Baseline security headers. Kept deliberately conservative: no CSP, because
 * the app inlines styles and scripts that a strict policy would need auditing
 * against first, and a broken CSP fails closed on a live site.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // robots.txt intentionally says nothing about /admin (see app/robots.ts).
      // This header is the part that actually keeps it out of the index, and
      // unlike page metadata it also covers the API responses.
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
  experimental: {
    serverActions: {
      // Testimonial photos and blog covers are uploaded through Server Actions;
      // the 1MB default rejects most camera-sized images.
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
