import type { NextConfig } from "next";

/**
 * Storage-hosted images (testimonial photos, blog covers) live on the Supabase
 * project's domain, which varies per environment — so derive it from the same
 * env var the client uses rather than hard-coding it.
 */
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
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
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
