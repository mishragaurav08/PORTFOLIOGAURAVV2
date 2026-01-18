import { useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const barRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // STEP 1: Find the real scroll container (once)
    const container =
      document.querySelector('[data-scroll-container]') ||
      Array.from(document.querySelectorAll('*')).find(
        el =>
          getComputedStyle(el).overflowY === 'auto' &&
          el.scrollHeight > el.clientHeight
      ) ||
      document.scrollingElement ||
      document.documentElement

    if (!container) return

    // STEP 2: Update progress
    const update = () => {
      const scrollTop = container.scrollTop
      const maxScroll = container.scrollHeight - container.clientHeight
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0

      if (barRef.current) {
        barRef.current.style.transform =
          `scaleX(${Math.max(progress, 0.02)})`
      }
    }

    // STEP 3: Throttled scroll handler
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Initial render
    update()

    return () => {
      container.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className={styles.container} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  )
}
