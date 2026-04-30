import React from 'react'
import styles from './Hero.module.css'
import { motion } from 'framer-motion'
export default function Hero() {
  const minimalFade = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  }

  const floatText = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
    },
  }

  const nameFade = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
    },
  }

  return (
    <section className={styles.container} id="hero" aria-label="Hero">
      <div className={styles.wrapper}>
        <motion.section
          className={styles.center}
          variants={minimalFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            className={styles.topText}
            variants={floatText}
            initial="hidden"
            whileInView="show"
          >
            Hey there, I&apos;m
          </motion.p>

          <div className={styles.titleBlock}>
            <motion.h1
              className={styles.huge}
              variants={nameFade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              GAURAV
            </motion.h1>

            <motion.p
              className={styles.subtitle}
              variants={floatText}
              initial="hidden"
              whileInView="show"
            >
              I am currently building <span className={styles.accentWord}>Interact</span>.
              <br />
              Explore selected work, case notes, and outcomes.
            </motion.p>
          </div>
        </motion.section>

        <div className={styles.scrollWrapper}>
          <a
            href="#about"
            className={styles.scrollIndicator}
            aria-label="Go to about section"
          >
            <motion.div className={styles.indicatorFill} aria-hidden="true" />
          </a>
          <div className={styles.scrollText}>Step inside</div>
        </div>
      </div>
    </section>
  )
}
