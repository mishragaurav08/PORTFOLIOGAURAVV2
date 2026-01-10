import React from 'react'
import styles from './About.module.css'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

export default function About() {
  return (
    <section className={styles.wrapper} id="about">
      <motion.div
        className={styles.headerRow}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>A LITTLE ABOUT ME</h2>
  <div className={styles.ruleWrapper} aria-hidden="true">
          <div className={styles.rule} />
          <div className={styles.ruleAccent} />
        </div>
      </motion.div>

      <div className={styles.card}>
<div className={styles.copy}>
  <p className={styles.paragraph}>
    <strong>I design and build digital products people actually use.</strong>{' '}
    I’m a UX/UI designer and frontend developer currently studying Computer Science (Cyber Security) at SRMIST.
  </p>

  <p className={styles.paragraph}>
    I co-founded <strong>Studique</strong>, a campus platform used by over <strong>15,000+ students</strong>, 
    where I work on frontend architecture, design systems, and core product decisions - shaping how the platform grows.
  </p>

  <p className={styles.paragraph}>
    I’ve interned with <strong>Samsung</strong> and am currently part of the{' '}
    <strong>Apple × Infosys iOS Developer Program</strong>.
  </p>
</div>



        <div className={styles.actions}>
          {(() => {
            const resumeHref = "https://drive.google.com/file/d/1owe5QFBcN31WJJM4txaOtS4iFAbXHYKW/preview"
            const isExternal = typeof resumeHref === 'string' && /^https?:\/\//i.test(resumeHref)

            if (isExternal) {
              return (
                <a
                  className={styles.resume}
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open resume"
                >
                  <FontAwesomeIcon icon={faFilePdf} className={styles.resumeIcon} aria-hidden />
                  <span className={styles.resumeText}>View resume</span>
                </a>
              )
            }

            // Same-page / hash action -> render a button with identical visuals
            return (
              <button
                type="button"
                className={styles.resume}
                aria-label="Open resume"
                onClick={() => {
                  if (typeof window === 'undefined') return
                  if (!resumeHref) return
                  if (resumeHref.startsWith('#')) {
                    const id = resumeHref.slice(1)
                    const el = document.getElementById(id)
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    // fallback behavior for non-hash same-page actions
                    window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: 'smooth' })
                  }
                }}
              >
                <FontAwesomeIcon icon={faFilePdf} className={styles.resumeIcon} aria-hidden />
                <span className={styles.resumeText}>Here’s my resume</span>
                <span className={styles.ctaArrow} aria-hidden>
                  →
                </span>
              </button>
            )
          })()}
        </div>
      </div>
    </section>
  )
}
