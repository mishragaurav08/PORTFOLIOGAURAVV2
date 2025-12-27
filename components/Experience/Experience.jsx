import React from 'react';
import styles from './Experience.module.css';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Samsung PRISM',
    org: 'Samsung R&D Institute India',
    date: "Mar 2025 - Present",
    desc: 'Worked on applied machine learning systems for large-scale network traffic analysis, building packet-level pipelines and evaluating real-world model performance.'
  },
  {
    title: 'Frontend Architect',
    org: 'Studique',
    date: "Nov 2024 - Present",
    desc: 'Co-founded Studique and lead frontend architecture, design systems, and core product decisions - shaping how the platform looks, feels, and scales for 15,000+ students.'
  },
  {
    title: 'iOS Developer Program',
    org: 'Apple x Infosys',
    date: 'Participant',
    desc: 'Selected for the Apple × Infosys iOS Developer Program, where I build iOS interfaces, explore Swift-based workflows, and practice mobile-first product thinking.'
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

export default function Experience() {
  return (
    <section className={styles.wrapper} id="experience">
      <motion.div
        className={styles.headerRow}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>My journey</h2>
        <div className={styles.ruleWrapper} aria-hidden>
          <div className={styles.rule} />
          <div className={styles.ruleAccent} />
        </div>
      </motion.div>
      <div className={styles.list}>
        {experiences.map((exp, i) => (
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
    </section>
  );
}