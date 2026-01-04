import React from 'react';
import styles from './Experience.module.css';

import { motion } from 'framer-motion';

const experiences = [
    {
    title: 'iOS Developer Program',
    org: 'Apple x Infosys',
    date: 'Participant',
    desc: 'Selected for the Apple × Infosys iOS Developer Program, where I build iOS interfaces, explore Swift-based workflows, and practice mobile-first product thinking.'
  },
  {
    title: 'Samsung PRISM',
    org: 'Samsung R&D Institute India',
    date: "Mar 2025 - Present",
    desc: 'Built applied ML systems for large-scale network traffic analysis, developing packet-level pipelines and evaluating real-world model performance.'
  },
  {
    title: 'Frontend Architect',
    org: 'Studique',
    date: "Nov 2024 - Present",
    desc: 'Co-founded Studique and lead frontend architecture, design systems, and core product decisions - shaping how the platform looks, feels, and scales for 15,000+ students.'
  },
  {
    title: 'Community Mentor',
    org: 'GitHub Community SRM',
    date: "Jun 2024 - Present",
    desc: 'Lead branding and UX for community initiatives, mentor 60+ students, organize design sprints and workshops, and help grow the campus design ecosystem.'
  },
  {
    title: 'UX/UI Designer',
    org: 'Independent Work',
    date: 'Freelance / Contract',
    desc: 'Deliver UX/UI and brand systems for apps and startups - covering Play Store creatives, marketing visuals, packaging designs, and product presentation systems.'
  }
];

export default function Experience({ limit, showHeader = true, wrap = true }) {
  const displayExperiences = limit ? experiences.slice(0, limit) : experiences;
  
  const content = (
    <>
      {showHeader && (
        <motion.div
          className={styles.headerRow}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className={styles.header}>{limit ? 'EXPERIENCE' : 'CAREER HIGHLIGHTS'}</h2>
          <div className={styles.ruleWrapper} aria-hidden>
            <div className={styles.rule} />
          </div>
             {limit && (
               <a
                 href="/experience"
                 className={styles.seeAll}
                 aria-label="View all experiences"
               >
                 <span className={styles.seeAllText}>Career overview</span>
               </a>
             )}
        </motion.div>
      )}
      <div className={styles.list}>
        {displayExperiences.map((exp, i) => (
          <article
            className={styles.item}
            key={i}
          >
            <div className={styles.itemHeader}>
              <div className={styles.titleWrapper}>
                <h3 className={styles.itemTitle}>{exp.title}</h3>
                <div className={styles.itemOrg}>{exp.org}</div>
              </div>
              <div className={styles.dateWrapper}>
                <div className={styles.itemDate}>{exp.date}</div>
              </div>
            </div>
            <p className={styles.itemDesc}>{exp.desc}</p>
          </article>
        ))}
      </div>
    </>
  );

  if (!wrap) {
    return content;
  }

  return (
    <section className={styles.wrapper}>
      {content}
    </section>
  );
}