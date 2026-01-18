import '../styles/global.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as analytics from '../lib/analytics'
import { Analytics } from "@vercel/analytics/next"
import ScrollProgress from '../components/ScrollProgress/ScrollProgress'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Track page views on route change
    const handleRouteChange = (url) => {
      analytics.pageview(url)
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700;900&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet" />
        {/* Font Awesome for icons (CDN) - no SRI here to avoid broken integrity value */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>
      <ScrollProgress />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
