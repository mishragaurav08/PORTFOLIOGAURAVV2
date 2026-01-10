import React from 'react';
import styles from './Thoughts.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const thoughts = [
  {
    id: 1,
    slug: 'samsung-prism',
    title: 'Inside Samsung PRISM',
    date: 'Mar 2025',
    excerpt: 'How I got selected, what actually happens, and what nobody tells you.',
    link: '/thoughts/samsung-prism',
    comingSoon: false
  },
  {
    id: 2,
    slug: 'ios-developer-program',
    title: 'iOS Developer Program',
    date: 'Dec 2024',
    excerpt: 'Selection, training, and what Apple actually teaches you.',
    link: '/thoughts/ios-developer-program',
    comingSoon: false
  }
];

export default function Thoughts({ limit }) {
  const displayThoughts = limit ? thoughts.slice(0, limit) : thoughts;

  return (
    <section className={styles.wrapper} id="thoughts">
      <motion.div
        className={styles.headerRow}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>Thoughts & Builds</h2>
        <div className={styles.ruleWrapper} aria-hidden>
          <div className={styles.rule} />
          <div className={styles.ruleAccent} />
        </div>
      </motion.div>

      <div className={styles.grid}>
        {displayThoughts.map((thought) => (
          <article key={thought.id} className={`${styles.card} ${thought.comingSoon ? styles.cardComingSoon : ''}`}>
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{thought.title}</h3>
              {!thought.comingSoon && <p className={styles.excerpt}>{thought.excerpt}</p>}
            </div>
            {thought.comingSoon ? (
              <div className={styles.comingSoonBadge}>
                <span>Coming Soon</span>
              </div>
            ) : (
              <Link href={`/thoughts/${thought.slug}`} legacyBehavior>
                <a
                  className={styles.readMore}
                  aria-label={`Read ${thought.title}`}
                >
                  <span className={styles.readText}>Read</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.arrow} aria-hidden />
                </a>
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
