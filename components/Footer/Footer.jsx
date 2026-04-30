import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  { line1: 'Curious?', line2: 'Take a look at the resume.' },
  { line1: 'No buttons, no noise.', line2: 'Just the resume.' },
  { line1: 'Still here?', line2: "The resume's right there." },
  { line1: 'If you want details -', line2: 'check the resume.' },
];

export default function Footer() {
  const [isActive, setIsActive] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  // Listen for the floating button notifying us it's hidden
  useEffect(() => {
    const handler = (e) => {
      setIsActive(Boolean(e.detail?.visible));
      if (e.detail?.visible) setMsgIndex(0);
    };
    window.addEventListener('mascot:footerVisible', handler);
    return () => window.removeEventListener('mascot:footerVisible', handler);
  }, []);

  // Cycle messages while active
  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(t);
  }, [isActive]);

  const msg = MESSAGES[msgIndex];

  return (
    <footer id="site-footer" className={styles.footer}>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left: quote */}
        <div className={styles.content}>
          <div className={styles.quote}>
            <span className={styles.secondary}>Thoughtfully </span>
            <span className={styles.primary}>designed</span><br />
            <span className={styles.secondary}>Purposefully </span>
            <span className={styles.primary}>built</span>
          </div>
        </div>

        {/* Right: mascot + inline message */}
        <div className={styles.leftCol}>
          {/* Mascot — acts as resume trigger when active */}
          <motion.button
            className={`${styles.mascotBtn} ${isActive ? styles.mascotActive : ''}`}
            data-open-resume={isActive ? true : undefined}
            aria-label={isActive ? 'Open résumé' : undefined}
            tabIndex={isActive ? 0 : -1}
            animate={isActive ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            transition={
              isActive
                ? { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            whileHover={isActive ? { scale: 1.08 } : {}}
            whileTap={isActive ? { scale: 0.93 } : {}}
          >
            <Image
              src="/icon.png"
              alt="Cat mascot"
              width={256}
              height={256}
              className={styles.mascotImg}
              loading="lazy"
            />
          </motion.button>

          {/* Inline message — sits to the right of the cat in the footer row */}
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                key={msgIndex}
                className={styles.mascotMsg}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                aria-live="polite"
              >
                <span className={styles.msgLine1}>{msg.line1}</span>
                <span className={styles.msgLine2}>{msg.line2}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </footer>
  );
}
