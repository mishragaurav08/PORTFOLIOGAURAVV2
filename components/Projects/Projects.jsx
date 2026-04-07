import React from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import projectsData from './projects.json';
import CTAButton from './CTAButton';

export default function Projects() {
  const projects = projectsData;

  return (
    <section className={styles.wrapper} id="projects">
      <motion.div
        className={styles.headerRow}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>What I Built</h2>
        <p className={styles.intro}>This is the part where ideas turned into products, experiments, and lessons.</p>
      </motion.div>

      <div className={styles.grid}>
        {projects.map((p) => (
          <article
            key={p.id}
            className={styles.card}
          >
            <div className={styles.media} aria-label={`${p.title} project preview`}>
              <img
                src={p.image}
                alt={`${p.title} project interface`}
                loading="lazy"
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardHead}>
                <div className={styles.titleWrapper}>
                  <h3 className={styles.title}>{p.title}</h3>
                  <div className={styles.tag}>{p.tag}</div>
                </div>
                <div className={styles.buttonWrapper}>
                  {p.type === 'inprogress' && (
                    <CTAButton type="inprogress">Building</CTAButton>
                  )}
                  {p.type === 'demo' && (
                    <CTAButton type="demo" href={p.link}>
                      {p.link ? 'Live' : 'Coming Soon'}
                    </CTAButton>
                  )}
                  {p.type === 'design' && (
                    <CTAButton type="design" href={p.link}>
                      {p.link ? 'Design' : 'Coming Soon'}
                    </CTAButton>
                  )}
                  {p.type === 'github' && (
                    <CTAButton type="github" href={p.link}>
                      {p.link ? 'GitHub' : 'Coming Soon'}
                    </CTAButton>
                  )}
                </div>
              </div>
              <p className={styles.desc}>{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
