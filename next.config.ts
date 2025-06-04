import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['images.pexels.com'],
  },
  experimental: {
    turbo: false,
  },
};

export default nextConfig;
