import React from 'react';
import styles from './Thoughts.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import thoughtsData from './thoughtsData.json';
import * as analytics from '../../lib/analytics';

function estimateReadTime(content = []) {
  const words = content
    .map((block) => [block.text, ...(block.items || [])].join(' '))
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function scrollToPageTop() {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const appRoot = document.getElementById('__next');
  if (appRoot) appRoot.scrollTop = 0;
  const scroller = document.scrollingElement;
  if (scroller) scroller.scrollTop = 0;
}

export default function Thoughts() {
  const displayThoughts = thoughtsData;

  return (
    <section className={styles.wrapper} id="thoughts">
      <motion.h2
        className={styles.header}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        What I Learned
      </motion.h2>
      <p className={styles.sectionIntro}>Notes from projects, programs, and moments that changed how I ship products.</p>

      {displayThoughts.length === 0 ? (
        <div className={styles.emptyState}>No thoughts published yet. New notes coming soon.</div>
      ) : (
        <div className={styles.grid}>
          {displayThoughts.map((thought) => (
          <article key={thought.id} className={`${styles.card} ${thought.comingSoon ? styles.cardComingSoon : ''}`}>
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{thought.title}</h3>
              {/* Meta removed per request */}
              {!thought.comingSoon && <p className={styles.excerpt}>{thought.excerpt}</p>}
            </div>
            {thought.comingSoon ? (
              <div className={styles.comingSoonBadge}>
                <span>Coming Soon</span>
              </div>
            ) : (
              <Link
                href={`/thoughts/${thought.slug}`}
                className={styles.readMore}
                aria-label={`Read ${thought.title}`}
                onClick={() => {
                  scrollToPageTop();
                  analytics.trackCtaClick(`Read Thought - ${thought.title}`);
                }}
              >
                <span className={styles.readText}>Read</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.arrow} aria-hidden />
              </Link>
            )}
          </article>
          ))}
        </div>
      )}
    </section>
  );
}
