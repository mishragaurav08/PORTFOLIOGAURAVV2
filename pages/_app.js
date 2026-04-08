/* eslint-disable react/prop-types */
import '../styles/global.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import * as analytics from '../lib/analytics'
import { Analytics } from "@vercel/analytics/next"
import { AnimatePresence, motion } from 'framer-motion'
import ScrollProgress from '../components/ScrollProgress/ScrollProgress'
import ResumeModal from '../components/ResumeModal/ResumeModal'
import BackToTop from '../components/BackToTop/BackToTop'

function scrollToPageTop() {
  if (typeof window === 'undefined') return;

  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const appRoot = document.getElementById('__next');
  if (appRoot) {
    appRoot.scrollTop = 0;
  }

  const scroller = document.scrollingElement;
  if (scroller) {
    scroller.scrollTop = 0;
  }
}

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
    // Track page views on route change.
    const handleRouteChange = (url) => {
      analytics.pageview(url);
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
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const isMobileLike = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
      if (isMobileLike) return
      event.preventDefault()
      analytics.trackCtaClick('Open Resume Modal')
      openResumeModal()
    }

    document.addEventListener('click', onDocumentClick)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [openResumeModal])

  useEffect(() => {
    let rafId = null

    const handleRouteScroll = (url) => {
      if (url.includes('#')) return
      if (url.startsWith('/thoughts/')) {
        if (rafId !== null) {
          cancelAnimationFrame(rafId)
        }
        rafId = requestAnimationFrame(scrollToPageTop)
      }
    }

    router.events.on('routeChangeComplete', handleRouteScroll)
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      router.events.off('routeChangeComplete', handleRouteScroll)
    }
  }, [router.events])

  useEffect(() => {
    const container =
      document.getElementById('__next') ||
      document.scrollingElement ||
      document.documentElement

    if (!container) return undefined

    const trackedDepths = new Set()
    const onScroll = () => {
      const maxScroll = container.scrollHeight - container.clientHeight
      if (maxScroll <= 0) return
      const depth = (container.scrollTop / maxScroll) * 100
      if (depth >= 25 && !trackedDepths.has(25)) {
        trackedDepths.add(25)
        analytics.trackScrollDepth('25%')
      }
      if (depth >= 50 && !trackedDepths.has(50)) {
        trackedDepths.add(50)
        analytics.trackScrollDepth('50%')
      }
      if (depth >= 75 && !trackedDepths.has(75)) {
        trackedDepths.add(75)
        analytics.trackScrollDepth('75%')
      }
      if (depth >= 98 && !trackedDepths.has(100)) {
        trackedDepths.add(100)
        analytics.trackScrollDepth('100%')
      }
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [router.asPath])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700;900&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* Font Awesome for icons (CDN) - no SRI here to avoid broken integrity value */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <BackToTop />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
          <main id="main-content" tabIndex={-1}>
            <Component {...pageProps} />
          </main>
        </motion.div>
      </AnimatePresence>
      <ResumeModal isOpen={isResumeOpen} onClose={closeResumeModal} />
      <Analytics />
    </>
  )
}

export function reportWebVitals(metric) {
  analytics.trackWebVitals(metric)
}
