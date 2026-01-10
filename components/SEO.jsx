import Head from 'next/head'

export default function SEO({
  title = 'Gaurav Mishra - UX/UI Designer & Frontend Developer | SRMIST',
  description = 'Gaurav Mishra is a UX/UI designer and frontend developer at SRMIST. Co-founder of Studique (15,000+ students). Expert in React, Next.js, and product design. Samsung & Apple iOS Developer Program alumni.',
  keywords = 'Gaurav Mishra, Gaurav Mishra SRMIST, Gaurav SRM, Gaurav Mishra portfolio, UX Designer SRMIST, Studique founder, Studique SRM, UI Designer, Frontend Developer, Web Developer SRMIST, React Developer, Next.js, Computer Science SRMIST, Cyber Security, Samsung Intern, Apple Developer, Gaurav Mishra developer',
  ogImage = '/assets/mascot.svg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  author = 'Gaurav Mishra',
  robots = 'index, follow',
}) {
  const baseUrl = 'https://gauravmishra.dev' 
  const fullUrl = canonicalUrl || baseUrl
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Gaurav Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
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
              'https://www.linkedin.com/in/gaurav-mishra-2668691b3/',
              'https://github.com/gauravMishra08',
              'https://www.figma.com/@gaurav08',
              'https://www.instagram.com/mishragaurav08/',
            ],
            knowsAbout: [
              'UX Design',
              'UI Design',
              'Frontend Development',
              'React',
              'Next.js',
              'Web Development',
              'Cyber Security',
              'Product Design',
              'Studique',
            ],
          }),
        }}
      />
    </Head>
  )
}
