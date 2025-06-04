/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      enabled: false,
    },
  },
  images: {
    domains: ["images.pexels.com"],
  },
};

module.exports = nextConfig;
