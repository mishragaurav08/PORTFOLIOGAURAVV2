import React, { useState } from 'react';
import styles from './Contact.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFigma, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as analytics from '../../lib/analytics';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello.gauravdev@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 200000);
      // Track email copy event
      analytics.trackButtonClick('Copy Email');
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleSocialClick = (platform) => {
    analytics.trackOutboundLink(`Social - ${platform}`, platform);
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
          <p className={styles.responseTime}>I usually respond within 24 hours.</p>
        </div>
        <div className={styles.right}>
          <div className={styles.socialLabel}>Around the web</div>
          <div className={styles.socialIcons}>
            <a 
              href="https://www.linkedin.com/in/mishragaurav08" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              onClick={() => handleSocialClick('LinkedIn')}
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a 
              href="https://github.com/mishragaurav08" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              onClick={() => handleSocialClick('GitHub')}
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a 
              href="https://www.figma.com/@mishragaurav08" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Figma"
              onClick={() => handleSocialClick('Figma')}
            >
              <FontAwesomeIcon icon={faFigma} size="2x" />
            </a>
            <a 
              href="https://www.instagram.com/mishragaurav08/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              onClick={() => handleSocialClick('Instagram')}
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
          <button
            onClick={handleCopyEmail}
            className={styles.ctaBtn}
            aria-label={`Copy email address: hello.gauravdev@gmail.com`}
          >
            <span className={styles.ctaText}>{copied ? 'Email copied!' : 'hello.gauravdev@gmail.com'}</span>
            {copied ? (
              <FontAwesomeIcon icon={faCheck} className={styles.ctaIcon} aria-hidden />
            ) : (
              <FontAwesomeIcon icon={faCopy} className={styles.ctaIcon} aria-hidden />
            )}
          </button>
          {/* Live region for announcing copy success to assistive tech */}
          <div aria-live="polite" role="status" className={styles.srOnly}>
            {copied ? 'Email copied!' : ''}
          </div>
          <a
            href="mailto:hello.gauravdev@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
            className={styles.mailFallback}
            aria-hidden="true"
            tabIndex={-1}
          >
          </a>
        </div>
      </div>
    </section>
  );
}