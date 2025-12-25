import React from 'react';
import styles from './Experience.module.css';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Samsung PRISM Intern',
    org: 'Samsung R&D Institute India',
    date: "Mar 2025 - Present",
    desc: 'Worked on applied ML systems for large-scale network traffic analysis. Built pipelines to process and classify packet-level data, evaluated model performance, and contributed to Samsung’s internal research workflows.'
  },
  {
    title: 'Co-Founder & Frontend Designer',
    org: 'Studique',
    date: "Nov 2024 - Present",
    desc: 'Co-founded a campus super-platform now used by 15,000+ students. I lead frontend architecture, design systems, UX strategy, and core product decisions.'
  },
  {
    title: 'iOS Developer Program',
    org: 'Apple & Infosys',
    date: 'Program Participant',
    desc: 'Selected for the Apple-Infosys iOS Developer Program. Trained in Swift, Apple UI frameworks, and mobile-first product design.'
  },
  {
    title: 'Community Mentor',
    org: 'GitHub Community SRM',
    date: "Jun 2024 - Present",
    desc: 'Lead branding and UX for community initiatives. Mentored 60+ students, organized workshops and design sprints, and helped grow the campus design ecosystem.'
  },
  {
    title: 'UX/UI Designer',
    org: 'Independent Projects',
    date: 'Freelance/Contract',
    desc: 'Delivered UX/UI assets for apps and brands - including Play Store creatives, marketing visuals, and packaging designs.'
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
        <h2 className={styles.header}>EXPERIENCE</h2>
        <div className={styles.ruleWrapper} aria-hidden>
          <div className={styles.rule} />
          <div className={styles.ruleAccent} />
        </div>
      </motion.div>
      <div className={styles.list}>
        {experiences.map((exp, i) => (
          <motion.article
            className={styles.item}
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.08 + i * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
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
          </motion.article>
        ))}
      </div>
    </section>
  );
}