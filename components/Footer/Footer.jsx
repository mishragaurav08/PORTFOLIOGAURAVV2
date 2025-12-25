import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.quote}>
          <span className={styles.secondary}>Everything is</span> <span className={styles.primary}>designed</span><br />
          <span className={styles.secondary}>Few things are <span className={styles.primary}>designed well</span></span>
        </div>
        <div className={styles.copyright}>
          <span className={styles.copyrightText}>© {new Date().getFullYear()} Gaurav Mishra</span>
          <span className={styles.copyrightDivider}>•</span>
          <span className={styles.copyrightText}>Built with React & Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}