import React from 'react';
import styles from './Thoughts.module.css';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
    slug: 'apple-infosys',
    title: 'iOS Developer Program',
    date: 'Dec 2024',
    excerpt: 'Coming Soon',
    link: '/thoughts/apple-infosys',
    comingSoon: true
  },
  {
    id: 3,
    slug: 'building-studique',
    title: 'Building Studique',
    date: 'Nov 2024',
    excerpt: 'Coming Soon',
    link: '/thoughts/building-studique',
    comingSoon: true
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
              <a
                href={thought.link}
                className={styles.readMore}
                aria-label={`Read ${thought.title}`}
              >
                <span className={styles.readText}>Read more</span>
                <ArrowUpRight size={18} strokeWidth={2} className={styles.arrow} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
