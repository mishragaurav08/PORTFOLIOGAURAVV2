import React, { useState } from 'react';
import styles from './Contact.module.css';
import { Linkedin, Github, Figma, Instagram, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('gaurav84294372@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };
  return (
    <section className={styles.wrapper} id="contact">
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.headingWrapper}>
            <h2 className={styles.heading}>Get in Touch</h2>
            <span className={styles.availabilityBadge}>Open to opportunities</span>
          </div>
          <p className={styles.desc}>
            If you're building something meaningful or just want to talk product, startups, or design - I'd love to hear from you.
          </p>
          <p className={styles.responseTime}>Usually responds within 24 hours.</p>
        </div>
        <div className={styles.right}>
          <div className={styles.socialLabel}>Around the web</div>
          <div className={styles.socialIcons}>
            <a href="https://www.linkedin.com/in/gaurav-mishra-2668691b3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={40} strokeWidth={1.5} />
            </a>
            <a href="https://github.com/gauravMishra08" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={40} strokeWidth={1.5} />
            </a>
            <a href="https://www.figma.com/@gaurav08" target="_blank" rel="noopener noreferrer" aria-label="Figma">
              <Figma size={40} strokeWidth={1.5} />
            </a>
            <a href="https://www.instagram.com/mishragaurav08/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={40} strokeWidth={1.5} />
            </a>
          </div>
          <button
            onClick={handleCopyEmail}
            className={styles.ctaBtn}
            aria-label="Copy email address"
          >
            <span className={styles.ctaText}>{copied ? 'Email copied!' : 'Say hello'}</span>
            {copied ? (
              <Check size={20} className={styles.ctaIcon} aria-hidden />
            ) : (
              <Copy size={20} className={styles.ctaIcon} aria-hidden />
            )}
          </button>
          <a
            href="mailto:gaurav84294372@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
            className={styles.mailFallback}
            aria-hidden="true"
            tabIndex={-1}
          >
            Email fallback
          </a>
        </div>
      </div>
    </section>
  );
}