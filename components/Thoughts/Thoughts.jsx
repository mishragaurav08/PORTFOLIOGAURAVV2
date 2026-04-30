import React from 'react';
import styles from './Thoughts.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import thoughtsData from '../../data/thoughtsData.json';
import * as analytics from '../../lib/analytics';

export default function Thoughts() {
  const displayThoughts = thoughtsData;

  return (
    <section className={styles.wrapper} id="thoughts">
      <motion.div
        className={styles.sectionHeaderRow}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>What I Learned</h2>
      </motion.div>
      
      {displayThoughts.length === 0 ? (
        <div className={styles.emptyState}>No thoughts published yet. New notes coming soon.</div>
      ) : (
        <motion.div 
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
        >
          {displayThoughts.map((thought) => (
          <motion.article 
            key={thought.id} 
            className={`${styles.card} ${thought.comingSoon ? styles.cardComingSoon : ''}`}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }
            }}
          >
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
                href={`/thoughts/${thought.slug}`}
                className={styles.readMore}
                aria-label={`Read ${thought.title}`}
                onClick={() => {
                  analytics.trackCtaClick(`Read Thought - ${thought.title}`);
                }}
              >
                <span className={styles.readText}>Read</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.arrow} aria-hidden />
              </Link>
            )}
          </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}
