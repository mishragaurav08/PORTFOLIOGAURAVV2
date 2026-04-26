import styles from './BackToTop.module.css'
import * as analytics from '../../lib/analytics'

export default function BackToTop() {
  const handleResumeClick = () => {
    analytics.trackResumeDownload()
    analytics.trackCtaClick('Floating Resume Button')
  }

  return (
    <a
      className={styles.resumeButton}
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
