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
  async redirects() {
    return [
      {
        source: '/thoughts/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
