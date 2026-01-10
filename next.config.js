/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com'],
  },
  // Enable better performance
  compress: true,
  // Generate sitemap on build
  trailingSlash: false,
}

module.exports = nextConfig
