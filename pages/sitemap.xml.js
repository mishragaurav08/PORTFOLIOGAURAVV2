import fs from 'node:fs'
import path from 'node:path'

function safeIsoDate(value, fallback = Date.now()) {
  const parsed = new Date(value || fallback)
  return Number.isNaN(parsed.getTime())
    ? new Date(fallback).toISOString()
    : parsed.toISOString()
}

function generateSiteMap() {
  const domain = 'https://gauravmishra.dev'
  
  // Read all thought posts
  const thoughtsDirectory = path.join(process.cwd(), 'data')
  let thoughtPosts = []
  
  try {
    const thoughtsData = JSON.parse(
      fs.readFileSync(path.join(thoughtsDirectory, 'thoughtsData.json'), 'utf8')
    )
    thoughtPosts = Array.isArray(thoughtsData) ? thoughtsData : (thoughtsData.thoughts || [])
  } catch {
    thoughtPosts = []
  }

  const homepageLastMod =
    thoughtPosts.length > 0
      ? thoughtPosts
          .map((post) => {
            const date = new Date(post.date || Date.now())
            return Number.isNaN(date.getTime()) ? 0 : date.getTime()
          })
          .reduce((max, timestamp) => Math.max(max, timestamp), 0)
      : Date.now()

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Main pages -->
     <url>
       <loc>${domain}</loc>
       <lastmod>${safeIsoDate(homepageLastMod)}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     ${thoughtPosts
       .filter((post) => Boolean(post.slug))
       .map((post) => {
         return `
     <url>
      <loc>${domain}/thoughts/${post.slug}</loc>
       <lastmod>${safeIsoDate(post.date)}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
       `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Generate the XML sitemap
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
