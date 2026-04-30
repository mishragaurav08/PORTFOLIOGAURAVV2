import { useEffect, useState, useCallback } from 'react'
import styles from './BackToTop.module.css'
import * as analytics from '../../lib/analytics'

export default function BackToTop() {
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const footer = document.getElementById('site-footer')
    if (!footer) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const visible = Boolean(entry?.isIntersecting)
        setIsFooterVisible(visible)

        // Notify the footer mascot
        const event = new CustomEvent('mascot:footerVisible', { detail: { visible } })
        window.dispatchEvent(event)
      },
      { threshold: 0.12 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const handleResumeClick = () => {
    analytics.trackResumeDownload()
    analytics.trackCtaClick('Floating Resume Button')
  }

  return (
    <a
      className={`${styles.resumeButton} ${isFooterVisible ? styles.hidden : ''}`}
      href="/Gaurav.pdf"
      target="_blank"
      rel="noopener noreferrer"
      data-open-resume
      aria-label="Open resume"
      onClick={handleResumeClick}
    >
      <span className={styles.resumeIconWrap}>
        <img src="/icon.png" alt="" className={styles.resumeIconImage} />
      </span>
      <span className={styles.resumeLabel}>Resume</span>
    </a>
  )
}
