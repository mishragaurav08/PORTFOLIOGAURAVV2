/* eslint-disable react/prop-types */
import '../styles/global.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import * as analytics from '../lib/analytics'
import { Analytics } from "@vercel/analytics/next"
import ScrollProgress from '../components/ScrollProgress/ScrollProgress'
import ResumeModal from '../components/ResumeModal/ResumeModal'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const openResumeModal = useCallback(() => {
    setIsResumeOpen(true)
  }, [])

  const closeResumeModal = useCallback(() => {
    setIsResumeOpen(false)
  }, [])

  useEffect(() => {
    // Track page views and scroll to top on route change
    const handleRouteChange = (url) => {
      analytics.pageview(url);
      if (globalThis.window !== undefined) {
        globalThis.window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const onDocumentClick = (event) => {
      const trigger = event.target.closest('[data-open-resume]')
      if (!trigger) return
      event.preventDefault()
      openResumeModal()
    }

    document.addEventListener('click', onDocumentClick)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [openResumeModal])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700;900&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* Font Awesome for icons (CDN) - no SRI here to avoid broken integrity value */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>
      <ScrollProgress />
      <Component {...pageProps} />
      <ResumeModal isOpen={isResumeOpen} onClose={closeResumeModal} />
      <Analytics />
    </>
  )
}
