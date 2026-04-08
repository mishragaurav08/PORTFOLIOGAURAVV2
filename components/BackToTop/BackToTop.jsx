import { useEffect, useState } from 'react'
import styles from './BackToTop.module.css'
import * as analytics from '../../lib/analytics'

function getScrollContainer() {
  if (typeof document === 'undefined') return null
  return (
    document.getElementById('__next') ||
    document.scrollingElement ||
    document.documentElement
  )
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = getScrollContainer()
    if (!container) return undefined

    const updateVisibility = () => {
      const maxScroll = container.scrollHeight - container.clientHeight
      const ratio = maxScroll > 0 ? container.scrollTop / maxScroll : 0
      setVisible(ratio >= 0.3)
      setProgress(Math.min(1, Math.max(0, ratio)))
    }

    container.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)
    updateVisibility()

    return () => {
      container.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  const handleBackToTop = () => {
    const container = getScrollContainer()
    if (!container) return
    container.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    analytics.trackCtaClick('Back To Top')
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      onClick={handleBackToTop}
      aria-label="Back to top"
      style={{ ['--p']: progress }}
    >
      <span className={styles.ring} aria-hidden="true" />
      <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 5l7 7-1.4 1.4L13 8.8V20h-2V8.8L6.4 13.4 5 12l7-7z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}
