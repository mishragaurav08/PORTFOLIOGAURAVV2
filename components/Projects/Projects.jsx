import React from 'react';
import styles from './Projects.module.css';
import projectsData from './projects.json';
import CTAButton from './CTAButton';

export default function Projects() {
  const projects = projectsData.slice(0, 3);
  
  const images = [
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w-800&q=80'
  ];

  return (
    <section className={styles.wrapper} id="projects">
<div className={styles.headerRow}>
  <h2 className={styles.header}>PROJECTS</h2>
  <div className={styles.ruleWrapper} aria-hidden>
    <div className={styles.rule} />
  </div>
  <a href="/projects" className={styles.seeAll} aria-label="View all projects">
    See All
  </a>
</div>
      
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <article key={p.id} className={styles.card}>
            <div className={styles.media} aria-label={`${p.title} project preview`}>
              <img
                src={images[i % images.length]}
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
                    <CTAButton type="inprogress">In Progress</CTAButton>
                  )}
                  {p.type === 'demo' && p.link && (
                    <CTAButton type="demo" href={p.link}>Demo</CTAButton>
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