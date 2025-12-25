import React from 'react';
import styles from './Contact.module.css';
import { FaLinkedin, FaGithub, FaInstagram, FaFigma, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className={styles.wrapper} id="contact">
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.heading}>Get in Touch</h2>
          <p className={styles.desc}>
            Let’s build something meaningful. If you want to collaborate, discuss product ideas, startups, design systems, or just exchange thoughts - I’m always open to good conversations.
          </p>
        </motion.div>
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.14 }}
          viewport={{ once: true }}
        >
          <div className={styles.socialLabel}>Follow me on</div>
          <div className={styles.socialIcons}>
            <a href="https://www.linkedin.com/in/gaurav-mishra-2668691b3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/gauravMishra08" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.figma.com/@gaurav08" target="_blank" rel="noopener noreferrer" aria-label="Figma">
              <FaFigma />
            </a>
            <a href="https://www.instagram.com/mishragaurav08/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
          <a
            href="mailto:gaurav84294372@gmail.com"
            className={styles.ctaBtn}
          >
            <span>Contact Me</span>
            <FaPaperPlane className={styles.ctaIcon} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}