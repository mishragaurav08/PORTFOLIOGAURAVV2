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
        <h2 className={styles.header}>A little about me</h2>
        <div className={styles.ruleWrapper} aria-hidden>
          <div className={styles.rule} />
          <div className={styles.ruleAccent} />
        </div>
      </motion.div>

      <div className={styles.card}>
        <p className={styles.copy}>
          I'm a <strong>product-focused UX/UI designer and frontend developer</strong>. I enjoy building things that real people actually use - not just things that look good on Figma. I'm currently pursuing Computer Science (Cyber Security) at SRMIST and co-founded <strong>Studique</strong>, a campus super-platform trusted by over <strong>15,000+ students</strong>. I lead frontend architecture, design systems, and core product decisions - shaping how the platform looks, feels, and scales. Along the way, I've interned with <strong>Samsung PRISM</strong> and currently part of the <strong>Apple x Infosys iOS Developer Program</strong>.
        </p>

        <div className={styles.actions}>
          <a
            className={styles.resume}
            href="https://drive.google.com/file/d/1owe5QFBcN31WJJM4txaOtS4iFAbXHYKW/preview"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume"
          >
            <span>Here’s my resume →</span>
          </a>
        </div>
      </div>

    </section>
  )
}
