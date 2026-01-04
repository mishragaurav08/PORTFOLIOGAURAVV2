import React from 'react'
import styles from './About.module.css'
import { motion } from 'framer-motion'

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
        <div className={styles.ruleWrapper} aria-hidden>
          <div className={styles.rule} />
          <div className={styles.ruleAccent} />
        </div>
      </motion.div>

      <div className={styles.card}>
        <div className={styles.copy}>
          <p className={styles.paragraph}>
            <strong>I design and build digital products that people actually use.</strong>{' '}
            I'm a product-focused UX/UI designer and frontend developer currently pursuing Computer Science (Cyber Security) at SRMIST.
          </p>
          
          <p className={styles.paragraph}>
            I co-founded <strong>Studique</strong>, a campus super-platform trusted by over <strong>15,000+ students</strong>, 
            where I lead frontend architecture, design systems, and core product decisions - shaping how the platform looks, feels, 
            and scales as more students join.
          </p>
          
          <p className={styles.paragraph}>
            I've also interned with <strong>Samsung PRISM</strong> and am currently part of the{' '}
            <strong>Apple × Infosys iOS Developer Program</strong>.
          </p>
        </div>

        <div className={styles.actions}>
          <a
            className={styles.resume}
            href="https://drive.google.com/file/d/1owe5QFBcN31WJJM4txaOtS4iFAbXHYKW/preview"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume"
          >
            <span className={styles.resumeText}>Here’s my resume</span>
            <span className={styles.ctaArrow} aria-hidden>
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
