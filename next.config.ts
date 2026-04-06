import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
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

export default withNextIntl(nextConfig);
