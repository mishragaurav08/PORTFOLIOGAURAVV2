import Head from 'next/head'

export default function SEO({
  title = 'Gaurav Mishra | UX/UI Designer, Frontend & iOS Developer',
  description = 'Portfolio of Gaurav Mishra - UX/UI designer, frontend and iOS developer from SRMIST. Builder of Studique (15,000+ users), Interact, herSpace, and projects across React, Next.js, SwiftUI, and product design.',
  keywords = 'Gaurav Mishra, Gaurav Mishra portfolio, UX UI designer, frontend developer, iOS developer, SwiftUI developer, React developer, Next.js developer, product designer, full stack developer, Studique founder, SRMIST developer, Samsung PRISM, Apple Infosys iOS Developer Program, Infosys internship, Supabase, mobile app developer, web developer, IRCTC redesign, SRMConnect, herSpace iOS, Interact app',
  ogImage = '/icon.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  author = 'Gaurav Mishra',
  robots = 'index, follow',
}) {
  const baseUrl = 'https://gauravmishra.dev'
  const fullUrl = canonicalUrl || baseUrl
  const normalizedImage = ogImage || '/icon.png'
  const fullImageUrl = normalizedImage.startsWith('http') ? normalizedImage : `${baseUrl}${normalizedImage}`
  const siteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="application-name" content="Gaurav Mishra Portfolio" />
      <meta name="apple-mobile-web-app-title" content="Gaurav Portfolio" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      {siteVerification ? <meta name="google-site-verification" content={siteVerification} /> : null}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content="Gaurav Mishra Portfolio" />
      <meta property="og:site_name" content="Gaurav Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0b1020" />
      <meta name="msapplication-TileColor" content="#0b1020" />
      
      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Gaurav Mishra',
            alternateName: ['Gaurav', 'Gaurav Mishra SRMIST'],
            url: baseUrl,
            image: fullImageUrl,
            jobTitle: 'UX/UI Designer & Frontend Developer',
            description: 'Co-founder of Studique, UX/UI Designer and Frontend Developer at SRMIST',
            worksFor: {
              '@type': 'Organization',
              name: 'Studique',
              description: 'Campus platform used by 15,000+ students at SRMIST',
            },
            alumniOf: {
              '@type': 'EducationalOrganization',
              name: 'SRM Institute of Science and Technology',
              alternateName: ['SRMIST', 'SRM University', 'SRM'],
            },
            sameAs: [
              'https://www.linkedin.com/in/mishragaurav08',
              'https://github.com/mishragaurav08',
              'https://www.instagram.com/mishragaurav08',
            ],
            knowsAbout: [
              'UX Design',
              'UI Design',
              'Frontend Development',
              'React',
              'Next.js',
              'SwiftUI',
              'iOS Development',
              'Supabase',
              'Web Development',
              'Product Design',
              'Studique',
              'Samsung PRISM',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Gaurav Mishra Portfolio',
            url: baseUrl,
            inLanguage: 'en-US',
            publisher: {
              '@type': 'Person',
              name: 'Gaurav Mishra',
              url: baseUrl,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description,
            url: fullUrl,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Gaurav Mishra Portfolio',
              url: baseUrl,
            },
            about: {
              '@type': 'Person',
              name: 'Gaurav Mishra',
              url: baseUrl,
            },
          }),
        }}
      />
    </Head>
  )
}
