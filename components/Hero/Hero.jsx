import React from 'react'
import styles from './Hero.module.css'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero() {
  const reduce = useReducedMotion()

  // Framer Motion variants for staggered entrance of hero text
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  }

  // item accepts a custom index to control individual delays (0.1, 0.2, 0.4)
  const delays = [0.1, 0.2, 0.4]
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delays[i] ?? 0.1 } })
  }

  // We will always animate the indicator in a continuous loop (independent of scroll)
  // Respect reduced motion preference by freezing it.

  return (
    <main className={styles.container}>

      <motion.section className={styles.center} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.p className={styles.topText} variants={item} custom={0}>Hey There I'm</motion.p>
        <motion.h1 className={styles.huge} variants={item} custom={1}>GAURAV</motion.h1>
        <motion.p className={styles.subtitle} variants={item} custom={2}>Currently Studying Computer <br></br>Science and Engineering</motion.p>
      </motion.section>

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
