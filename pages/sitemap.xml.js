import fs from 'fs'
import path from 'path'

function generateSiteMap() {
  // Replace with your actual domain
  const domain = 'https://gauravmishra.dev'
  
  // Read all thought posts
  const thoughtsDirectory = path.join(process.cwd(), 'components/Thoughts')
  let thoughtPosts = []
  
  try {
    const thoughtsData = JSON.parse(
      fs.readFileSync(path.join(thoughtsDirectory, 'thoughtsData.json'), 'utf8')
    )
    thoughtPosts = thoughtsData.thoughts || []
  } catch (error) {
    console.log('No thoughts found')
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Main pages -->
     <url>
       <loc>${domain}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${domain}/projects</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${domain}/experience</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     ${thoughtPosts
       .map((post) => {
         return `
     <url>
       <loc>${domain}/thoughts/${post.slug}</loc>
       <lastmod>${new Date(post.date || Date.now()).toISOString()}</lastmod>
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
