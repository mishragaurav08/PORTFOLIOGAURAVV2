import React from 'react'
import styles from './Hero.module.css'
import { motion, useReducedMotion } from 'framer-motion'
export default function Hero() {
  const reduce = useReducedMotion()
  const heroNameChars = [
    { key: 'g', char: 'G' },
    { key: 'a1', char: 'A' },
    { key: 'u', char: 'U' },
    { key: 'r', char: 'R' },
    { key: 'a2', char: 'A' },
    { key: 'v', char: 'V' },
  ]
  const minimalFade = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
    }
  }

  const nameSpring = {
    hidden: { scale: 0.92, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 12, delay: 0.2 },
    },
  }
  const floatText = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.4 },
    },
    float: {
      y: [0, -8, 0],
      transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  return (
    <main className={styles.container} id="hero">
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
            animate="float"
          >
            This is
          </motion.p>
          <motion.h1
            className={styles.huge}
            variants={nameSpring}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {heroNameChars.map((item, i) => (
              <motion.span
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 180, damping: 14 }}
                style={{ display: 'inline-block' }}
              >
                {item.char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            variants={floatText}
            initial="hidden"
            whileInView="show"
            animate="float"
          >
            I am currently building <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Interact</span>.
            <br />Keep scrolling and I will walk you through the journey.
          </motion.p>
        </motion.section>
      </div>
      <div className={styles.scrollWrapper}>
        <a
          href="#about"
          className={styles.scrollIndicator}
          aria-label="Go to about section"
        >
          {reduce ? (
            <motion.div className={styles.indicatorFill} aria-hidden="true" style={{ y: '0%' }} />
          ) : (
            <motion.div
              className={styles.indicatorFill}
              aria-hidden="true"
              animate={{ y: ['0%', '150%'] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
          )}
        </a>
        <div className={styles.scrollText}>Step inside</div>
      </div>
    </main>
  )
}