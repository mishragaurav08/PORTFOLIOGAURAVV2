import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer id="site-footer" className={styles.footer}>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.content}>
          <div className={styles.quote}>
            <span className={styles.secondary}>Thoughtfully </span>
            <span className={styles.primary}>designed</span>
            <span className={styles.separator}> · </span>
            <span className={styles.secondary}>Purposefully </span>
            <span className={styles.primary}>built</span>
          </div>
        </div>

        {/* Cat icon — mobile only */}
        <div className={styles.leftVisual}>
          <a
            className={styles.resumeIconLink}
            href="/Gaurav.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-open-resume
            aria-label="Open resume"
          >
            <Image
              src="/icon.png"
              alt="Resume"
              width={256}
              height={256}
              className={styles.leftImage}
              loading="lazy"
            />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
