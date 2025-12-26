import React from 'react';
import styles from './Footer.module.css';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.quote}>
          <span className={styles.secondary}>Thoughtfully </span> <span className={styles.primary}>designed</span><br />
          <span className={styles.secondary}>Purposefully </span><span className={styles.primary}>built</span>
        </div>
        <div className={styles.copyright}>
          <span className={styles.copyrightText}>© {new Date().getFullYear()} Gaurav Mishra</span>
          <span className={styles.copyrightDivider}>•</span>
          <span className={styles.copyrightText}>Built with React & Framer Motion</span>
        </div>
      </motion.div>
    </footer>
  );
}