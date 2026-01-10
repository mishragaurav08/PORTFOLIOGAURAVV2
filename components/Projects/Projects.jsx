import React from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import projectsData from './projects.json';
import CTAButton from './CTAButton';

export default function Projects() {
  const projects = projectsData.slice(0, 3);

  return (
    <section className={styles.wrapper} id="projects">
      <motion.div
        className={styles.headerRow}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>Selected work</h2>
        <a
          href="/projects"
          className={styles.seeAll}
          aria-label="View all projects"
        >
          <span className={styles.seeAllText}>
            View all works
            <FontAwesomeIcon icon={faChevronRight} className={styles.seeAllIcon} aria-hidden />
          </span>
        </a>
      </motion.div>

      <div className={styles.grid}>
        {projects.map((p) => (
          <article
            key={p.id}
            className={styles.card}
          >
            <div className={styles.media} aria-label={`${p.title} project preview`}>
              <img
                src={p.image || '/assets/default.png'}
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
                  {p.type === 'demo' && p.link && (
                    <CTAButton type="demo" href={p.link}>Live</CTAButton>
                  )}
                  {p.type === 'design' && p.link && (
                    <CTAButton type="design" href={p.link}>Design</CTAButton>
                  )}
                  {p.type === 'github' && p.link && (
                    <CTAButton type="github" href={p.link}>GitHub</CTAButton>
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