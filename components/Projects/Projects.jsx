import React from 'react';
import styles from './Projects.module.css';
import projectsData from './projects.json';
import CTAButton from './CTAButton';


export default function Projects() {
  // Only show top 3 projects
  const projects = projectsData.slice(0, 3);
  // Example images for demo
  const images = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  ]
  return (
    <section className={styles.wrapper} id="projects">
      <div className={styles.headerRow}>
        <h2 className={styles.header}>PROJECTS</h2>
        <div className={styles.ruleWrapper} aria-hidden>
          <div className={styles.rule} />
        </div>
        <a href="/projects" className={styles.seeAll} aria-label="See all projects">See All</a>
      </div>
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <article key={p.id} className={styles.card}>
            <div className={styles.media} role="img" aria-label={`${p.title} screenshot`}>
              <img
                src={images[i % images.length]}
                alt={`${p.title} preview`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px 15px 0 0' }}
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardHead}>
                <div>
                  <div className={styles.title}>{p.title}</div>
                  <div className={styles.tag}>{p.tag}</div>
                </div>
                {/* Conditionally render CTA buttons based on available links and type */}
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
              <p className={styles.desc}>{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

