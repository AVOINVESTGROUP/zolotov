import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "zolotov.store",
      },
      {
        protocol: "https",
        hostname: "api.zolotov.store",
      },
      {
        protocol: "https",
        hostname: "zolotov.store",
      },
    ],
  },
};

export default nextConfig;
