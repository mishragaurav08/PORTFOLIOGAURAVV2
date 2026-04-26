const thoughtsData = require('./components/Thoughts/thoughtsData.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
  },
  // Enable better performance
  compress: true,
  // Generate sitemap on build
  trailingSlash: false,
  async redirects() {
    const thoughtSlugs = thoughtsData
      .map((thought) => thought?.slug)
      .filter((slug) => typeof slug === 'string' && slug.length > 0)

    return thoughtSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/thoughts/${slug}`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig
