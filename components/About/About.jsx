import React from 'react'
import styles from './About.module.css'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import * as analytics from '../../lib/analytics'

export default function About() {
  return (
    <section className={styles.wrapper} id="about">
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>A Bit About Me</h2>

        <div className={styles.profileRow}>
          <img
            src="/assets/profile.png"
            alt="Gaurav Mishra profile"
            className={styles.profilePhoto}
            loading="lazy"
          />
          <div className={styles.copy}>
            <p className={styles.paragraph}>
              I started with one simple goal, build things people will actually use. That mindset led to <strong>Studique</strong>, which grew to <strong>15,000+ students</strong>, where I led frontend, design, and product decisions. Then came the <strong>Apple x Infosys iOS Program</strong>, an iOS internship at Infosys, and research work with <strong>Samsung</strong> on network traffic and ML systems. Right now, I am building <strong>Interact</strong>. Every project teaches me the same thing, great products happen when design, engineering, and product thinking move together.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <a
            className={styles.resume}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-open-resume
            aria-label="Open resume"
            onClick={() => {
              analytics.trackResumeDownload()
              analytics.trackCtaClick('View Resume')
            }}
          >
            <FontAwesomeIcon icon={faFilePdf} className={styles.resumeIcon} aria-hidden />
            <span className={styles.resumeText}>View Resume</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
