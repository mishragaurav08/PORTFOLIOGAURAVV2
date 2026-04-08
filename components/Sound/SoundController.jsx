import { useEffect, useRef, useState } from 'react'
import styles from './SoundController.module.css'

const PORTFOLIO_TRACK_URL = 'https://www.scottbuckley.com.au/library/wp-content/uploads/2021/10/Aurora.mp3'

export default function SoundController() {
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [supported, setSupported] = useState(true)
  const [showOnDevice, setShowOnDevice] = useState(true)
  const audioRef = useRef(null)

  const isMobileHapticsCapable = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
    const coarse = window.matchMedia('(pointer: coarse)').matches
    return coarse && typeof navigator.vibrate === 'function'
  }

  const triggerHaptic = (pattern = 10) => {
    if (!isMobileHapticsCapable()) return
    navigator.vibrate(pattern)
  }

  useEffect(() => {
    const canPlay = typeof window !== 'undefined' && typeof window.Audio !== 'undefined'
    setSupported(canPlay)
    if (typeof window === 'undefined') return

    const media = window.matchMedia('(pointer: coarse), (max-width: 768px)')
    const applyVisibility = () => {
      setShowOnDevice(!media.matches)
    }

    applyVisibility()
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', applyVisibility)
      return () => media.removeEventListener('change', applyVisibility)
    }
    media.addListener(applyVisibility)
    return () => media.removeListener(applyVisibility)
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.22
  }, [])

  useEffect(() => {
    if (!audioEnabled) return undefined

    const onInteraction = (event) => {
      const interactive = event.target.closest('a, button, [role="button"], [data-open-resume]')
      if (!interactive) return
      if (interactive.classList.contains(styles.toggleButton)) return
      triggerHaptic([8, 18, 8])
    }

    document.addEventListener('click', onInteraction)
    return () => {
      document.removeEventListener('click', onInteraction)
    }
  }, [audioEnabled])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const toggleAudio = async () => {
    const next = !audioEnabled

    if (!audioRef.current) return

    if (next) {
      try {
        await audioRef.current.play()
        setAudioEnabled(true)
        triggerHaptic(14)
      } catch {
        setAudioEnabled(false)
      }
    } else {
      audioRef.current.pause()
      setAudioEnabled(false)
      triggerHaptic(10)
    }
  }

  if (!supported || !showOnDevice) return null

  return (
    <div className={styles.controller} aria-label="Audio control">
      <audio
        ref={audioRef}
        src={PORTFOLIO_TRACK_URL}
        loop
        preload="auto"
      />
      <button
        type="button"
        className={`${styles.toggleButton} ${audioEnabled ? styles.on : ''}`}
        onClick={toggleAudio}
        aria-pressed={audioEnabled}
        aria-label={audioEnabled ? 'Turn music off' : 'Turn music on'}
        title={audioEnabled ? 'Music On' : 'Music Off'}
      >
        <span className={styles.visualizer} aria-hidden="true">
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
        <span className={styles.musicLabel}>Music</span>
        <span className={styles.stateChip}>
          {audioEnabled ? 'On' : 'Off'}
        </span>
      </button>
    </div>
  )
}
