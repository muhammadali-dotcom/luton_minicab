import type { NextConfig } from "next";
import { regionalAirports } from "./src/config/site";

const nextConfig: NextConfig = {
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
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
