import React from 'react'
import styles from './About.module.css'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className={styles.wrapper} id="about">
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className={styles.content}>
          <h2 className={styles.header}>A Bit About Me</h2>

          <div className={styles.copy}>
            <p className={styles.paragraph}>
              I started with a simple goal to build things people actually use. That’s how <span className={styles.highlight}>Studique</span> came up. I spent most of my time working on the frontend, design, and figuring out how it should feel, and it slowly grew to around <span className={styles.highlight}>15,000 students</span>.
            </p>
            <p className={styles.paragraph}>
              Since then, I’ve tried different things. I explored iOS through the <span className={styles.highlight}>Apple x Infosys program</span>, worked at <span className={styles.highlight}>Infosys</span>, and spent some time on research at <span className={styles.highlight}>Samsung</span>. But honestly, more than all that, I just like building and staying with things.
            </p>
            <p className={styles.paragraph}>
              I don’t move on quickly. If something feels off, I go back and fix it, sometimes again and again, until it feels right to me. That’s how I’ve learned most of what I know.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
