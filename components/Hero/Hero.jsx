import React from 'react'
import styles from './Hero.module.css'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const reduce = useReducedMotion()

  // Minimal, smooth fade-in for hero content
  const minimalFade = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
    }
  }



  // Spring scale for main name (kept)
  const nameSpring = {
    hidden: { scale: 0.92, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 12, delay: 0.2 },
    },
  }

  // Floating subtitle/top text effect
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
    <main className={styles.container}>
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
            You’re looking at
          </motion.p>
          <motion.h1
            className={styles.huge}
            variants={nameSpring}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {"GAURAV".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 180, damping: 14 }}
                style={{ display: 'inline-block' }}
              >
                {char}
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
            Currently building for iOS <br className={styles.lineBreak} />with Apple × Infosys
          </motion.p>
        </motion.section>
      </div>
      <div className={styles.scrollWrapper}>
        <div className={styles.scrollIndicator} aria-hidden="true">
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
        </div>
        <div className={styles.scrollText}>Start exploring</div>
      </div>
    </main>
  )
}