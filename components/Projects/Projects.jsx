import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import projectsData from '../../data/projects.json';
import CTAButton from './CTAButton';

export default function Projects() {
  const projects = projectsData;

  return (
    <section className={styles.wrapper} id="projects">
      <motion.div
        className={styles.headerRow}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>Selected Projects</h2>
      </motion.div>

      {projects.length === 0 ? (
        <div className={styles.emptyState}>Projects are being updated. Check back shortly.</div>
      ) : (
        <motion.div 
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
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
          {projects.map((p) => (
          <motion.article
            key={p.id}
            className={styles.card}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }
            }}
          >
            <div className={styles.media} aria-label={`${p.title} project preview`}>
              <Image
                src={p.image}
                alt={`${p.title} project interface`}
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardHead}>
                <div className={styles.titleWrapper}>
                  <h3 className={styles.title}>{p.title}</h3>
                  <div className={styles.tag}>{p.tag}</div>
              </div>
                {p.title !== 'Brand Visuals' && p.title !== 'herSpace' && (
                  <div className={styles.buttonWrapper}>
                    {p.type === 'inprogress' && (
                      <CTAButton type="inprogress" projectTitle={p.title}>Building</CTAButton>
                    )}
                    {p.type === 'demo' && (
                      <CTAButton type="demo" href={p.link} projectTitle={p.title}>
                        {p.link ? 'Live' : 'Private'}
                      </CTAButton>
                    )}
                    {p.type === 'design' && (
                      <CTAButton type="design" href={p.link} projectTitle={p.title}>
                        {p.link ? 'Design' : 'Private'}
                      </CTAButton>
                    )}
                    {p.type === 'github' && (
                      <CTAButton type="github" href={p.link} projectTitle={p.title}>
                        {p.link ? 'GitHub' : 'Private'}
                      </CTAButton>
                    )}
                    {p.type === 'private' && (
                      <CTAButton type="private" projectTitle={p.title}>Private</CTAButton>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.descGroup}>
                <p className={`${styles.desc} ${styles.descDesktop}`}>{p.desc}</p>
                <p className={`${styles.desc} ${styles.descMobile}`}>{p.mobileDesc || p.desc}</p>
              </div>

              {p.metrics && p.metrics.length > 0 && (
                <div className={styles.metricsGroup}>
                  {p.metrics.map((metric, idx) => (
                    <span key={idx} className={styles.metricPill}>
                      {metric}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}
