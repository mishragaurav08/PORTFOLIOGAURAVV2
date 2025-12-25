import React from 'react';
import styles from './Experience.module.css';

const experiences = [
  {
    title: 'Samsung PRISM Intern',
    org: 'Samsung R&D Institute India',
    date: "Mar 2025 - Present",
    desc: 'Worked on applied ML systems for large-scale network data analysis. Built pipelines to process, group and analyze packet-level traffic and contributed to system evaluation and internal research workflows under the PRISM program.'
  },
  {
    title: 'Co-Founder & Frontend Designer',
    org: 'Studique',
    date: "Nov 2024 - Present",
    desc: 'Co-founded a campus platform used by 15,000+ students; led frontend, UX and design systems, and iterated features through continuous user feedback while collaborating with a core team and contributors.'
  },
  {
    title: 'iOS Developer Program',
    org: 'Apple & Infosys',
    date: 'Program Participant',
    desc: 'Selected for the Apple-Infosys iOS Developer Program. Hands-on training in Swift, iOS UI patterns and Apple design standards with a focus on mobile-first product thinking.'
  },
  {
    title: 'Community Mentor',
    org: 'GitHub Community SRM',
    date: "Jun 2024 - Present",
    desc: 'Led design and branding for community events, mentored 60+ students in UX and design systems, and organised workshops and design sprints to grow the local design community.'
  },
  {
    title: 'UX/UI Designer',
    org: 'Independent Projects',
    date: 'Freelance',
    desc: 'Delivered UX/UI assets for mobile apps and social brands, including Play Store creatives, marketing visuals and packaging designs for small businesses.'
  }
];

export default function Experience() {
  return (
    <section className={styles.wrapper} id="experience">
      <div className={styles.headerRow}>
        <h2 className={styles.header}>EXPERIENCE</h2>
        <div className={styles.ruleWrapper} aria-hidden>
          <div className={styles.rule} />
          <div className={styles.ruleAccent} />
        </div>
      </div>
      <div className={styles.list}>
        {experiences.map((exp, i) => (
          <article className={styles.item} key={i}>
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