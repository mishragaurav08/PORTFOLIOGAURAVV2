import React from 'react';
import styles from './Thoughts.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import thoughtsData from './thoughtsData.json';

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
      <p className={styles.sectionIntro}>Notes from projects, programs, and moments that changed how I build.</p>

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
              <Link
                href={`/${thought.slug}`}
                className={styles.readMore}
                aria-label={`Read ${thought.title}`}
              >
                <span className={styles.readText}>Read</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.arrow} aria-hidden />
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
