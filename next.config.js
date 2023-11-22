/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["image.tmdb.org", "img.clerk.com"],
  },
};

module.exports = nextConfig;
