import React from 'react';
import styles from './Experience.module.css';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Samsung PRISM',
    org: 'Samsung R&D Institute India',
    date: "Mar'25 - Aug'25",
    desc: `At Samsung PRISM, I explored how network traffic behaves at scale. I built machine learning pipelines to analyze packet data and tested models to classify traffic patterns in production-like scenarios. This experience taught me to think beyond code—about systems, data, and real-world impact.`
  },
  {
    title: 'iOS Developer Intern',
    org: 'Infosys',
    date: 'Internship',
    desc: `During my internship at Infosys, I worked on a fleet management iOS app with real-time vehicle tracking. I built key onboarding flows, from authentication to profile verification, and developed modular SwiftUI components with a Supabase backend. It was my first experience shipping something that had to feel production-ready from day one.`
  },
  {
    title: 'Apple × Infosys iOS Developer Program',
    org: 'Apple x Infosys',
    date: 'Participant',
    desc: `This program is where I sharpened how I build for mobile. Working with SwiftUI, I focused on clean and performant interfaces while learning how real products are designed, iterated, and shipped. It was less about adding features and more about building them right.`
  },
  {
    title: 'UX/UI Designer',
    org: 'Independent Work',
    date: 'Freelance / Contract',
    desc: `Alongside development, I worked on design projects for apps and early-stage products. From interfaces to brand systems and Play Store assets, I helped shape how products look, feel, and communicate. That is where I learned that good design is not decoration, it is clarity.`
  }
];

export default function Experience() {
  const displayExperiences = experiences;
  
  const content = (
    <>
      <motion.div
        className={styles.headerRow}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>Where I Learned</h2>
      </motion.div>
      <div className={styles.list}>
        {displayExperiences.map((exp) => (
          <article
            className={styles.item}
            key={`${exp.title}-${exp.org}`}
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

  return (
    <section className={styles.wrapper}>
      {content}
    </section>
  );
}