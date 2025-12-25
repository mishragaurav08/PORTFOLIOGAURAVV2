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
        <h2 className={styles.header}>ABOUT ME</h2>
        <div className={styles.ruleWrapper} aria-hidden>
          <div className={styles.rule} />
          <div className={styles.ruleAccent} />
        </div>
      </motion.div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          className={styles.copy}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.12 }}
          viewport={{ once: true }}
        >
          I'm a <strong>Product-focused UX/UI designer and frontend developer</strong> who loves building systems that real people actually use. I'm currently pursuing Computer Science (Cyber Security) at SRMIST and co-founded <strong>Studique</strong>, a campus super-platform used by <strong>15,000+ students</strong>. I lead frontend architecture, design systems, and core product decisions, shaping how the platform looks, feels, and scales. Previously, I interned at <strong>Samsung PRISM '25</strong> and I'm currently part of the <strong>iOS Developer Program by Apple and Infosys</strong>, where I sharpen my engineering and mobile product thinking.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.18 }}
          viewport={{ once: true }}
        >
          <a
            className={styles.resume}
            href="https://drive.google.com/file/d/1owe5QFBcN31WJJM4txaOtS4iFAbXHYKW/preview"
            aria-label="Open resume"
          >
            <span className={styles.resumeIcon} aria-hidden>
              <i className="fas fa-file-pdf" aria-hidden></i>
            </span>
            <span>View Resume</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
