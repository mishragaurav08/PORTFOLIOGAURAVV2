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
          <motion.p className={styles.topText} variants={minimalFade}>Hey There I'm</motion.p>
          <motion.h1 className={styles.huge} variants={minimalFade}>GAURAV</motion.h1>
          <motion.p className={styles.subtitle} variants={minimalFade}>
            Currently Studying Computer<br className={styles.lineBreak} />Science and Engineering
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
              transition={{ duration: 1.6, repeat: Infinity, repeatType: 'reverse', ease: [0.76, 0, 0.24, 1] }}
            />
          )}
        </div>
        <div className={styles.scrollText}>SCROLL</div>
      </div>
    </main>
  )
}