import React from 'react';
import styles from './Contact.module.css';
import { FaLinkedin, FaGithub, FaInstagram, FaFigma, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  return (
    <section className={styles.wrapper} id="contact">
      <div className={styles.card}>
        <div className={styles.left}>
          <h2 className={styles.heading}>Get in Touch</h2>
          <p className={styles.desc}>
If you want to collaborate, discuss product ideas, startups, design systems, or just exchange thoughts - I’m always open to meaningful conversations.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.socialLabel}>Around the web</div>
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
            <span>Say hello</span>
            <FaPaperPlane className={styles.ctaIcon} />
          </a>
        </div>
      </div>
    </section>
  );
}