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

module.exports = nextConfig;
