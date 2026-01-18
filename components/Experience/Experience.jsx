import React from 'react';
import styles from './Experience.module.css';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const experiences = [
    {
    title: 'Samsung PRISM',
    org: 'Samsung R&D Institute India',
    date: "Mar'25 - Dec'25",
    desc: 'Worked on applied machine learning systems for large-scale network traffic analysis, building packet-level pipelines and evaluating real-world model performance in production-like environments.'
  },
    {
    title: 'iOS Developer Program',
    org: 'Apple x Infosys',
    date: 'Participant',
    desc: 'Selected for the Apple × Infosys iOS Developer Program, where I build iOS interfaces with Swift and develop strong mobile-first product thinking.'
  },
  {
    title: 'UX/UI Designer',
    org: 'Independent Work',
    date: 'Freelance / Contract',
    desc: 'Alongside my product work, I deliver UX/UI and brand systems for apps and startups, including Play Store creatives, marketing visuals, packaging designs, and product presentation systems.'
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
          <h2 className={styles.header}>{limit === 1 ? 'Current Focus' : (limit ? 'Experience' : 'Career Highlights')}</h2>
             {limit && (
               <a
                 href="/experience"
                 className={styles.seeAll}
                 aria-label="View all experiences"
               >
                 <span className={styles.seeAllText}>
                   View all
                   <FontAwesomeIcon icon={faArrowRight} className={styles.seeAllIcon} aria-hidden />
                 </span>
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