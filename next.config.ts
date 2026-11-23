import type { NextConfig } from "next";
import { regionalAirports } from "./src/config/site";

const nextConfig: NextConfig = {
  // Basic security headers on every response (audit, 23 November 2026). No Content-Security-Policy
  // yet: it needs testing against Next's inline scripts and the external booker first.
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "www.lutonminicab.com" }],
      destination: "https://lutonminicab.com/:path*",
      permanent: true,
    }, ...regionalAirports.flatMap(({ airports }) => airports.map(({ slug }) => ({
      source: `/airports/${slug}`,
      destination: "/airports#other-airports",
      permanent: true,
    })))];
  },
  // AVIF first (smaller files), WebP for browsers without AVIF support.
  images: { formats: ["image/avif", "image/webp"] },
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
