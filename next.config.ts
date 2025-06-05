/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,
  },
  images: {
    domains: ['images.pexels.com'],
  },
};

module.exports = nextConfig;
