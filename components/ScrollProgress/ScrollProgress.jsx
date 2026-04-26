import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from './ScrollProgress.module.css'
import { getScrollMetrics } from '../../lib/scroll'

export default function ScrollProgress() {
  const barRef = useRef(null)
  const rafRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => {
      const { ratio } = getScrollMetrics()

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.max(ratio, 0.02)})`
      }
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    const { element } = getScrollMetrics()
    if (element) {
      element.addEventListener('scroll', onScroll, { passive: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    update()

    return () => {
      if (element) {
        element.removeEventListener('scroll', onScroll)
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [router.asPath])

  return (
    <div className={styles.container} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  )
}
