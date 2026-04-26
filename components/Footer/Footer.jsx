import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import { motion } from 'framer-motion';

export default function Footer() {
  // Mascot logic removed

  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.leftVisual}>
          <Image
            src="/assets/footer.png"
            alt=""
            aria-hidden="true"
            width={800}
            height={600}
            className={styles.leftImage}
            loading="lazy"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.quote}>
            <span className={styles.secondary}>Thoughtfully </span>
            <span className={styles.primary}>designed</span><br />
            <span className={styles.secondary}>Purposefully </span>
            <span className={styles.primary}>built</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
