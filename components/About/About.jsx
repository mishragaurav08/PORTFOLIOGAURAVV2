import React from 'react'
import styles from './About.module.css'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

export default function About() {
  return (
    <section className={styles.wrapper} id="about">
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>A bit about me</h2>
<div className={styles.copy}>
  <p className={styles.paragraph}>
    I started with one simple goal, build things people will actually use. That mindset led to <strong>Studique</strong>, which grew to <strong>15,000+ students</strong>, where I led frontend, design, and product decisions. Then came the <strong>Apple x Infosys iOS Program</strong>, an iOS internship at Infosys, and research work with <strong>Samsung</strong> on network traffic and ML systems. Right now, I am building <strong>Interact</strong>. Every project teaches me the same thing, great products happen when design, engineering, and product thinking move together.
  </p>
</div>



        <div className={styles.actions}>
          <a
            className={styles.resume}
            href="/resume.pdf"
            data-open-resume
            aria-label="Open resume"
          >
            <FontAwesomeIcon icon={faFilePdf} className={styles.resumeIcon} aria-hidden />
            <span className={styles.resumeText}>View resume</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
