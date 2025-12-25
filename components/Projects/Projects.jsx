import React from 'react'
import styles from './Projects.module.css'

const projects = [
  { id: 1, title: 'GetItDone', tag: 'Full Stack', desc: 'Currently Developing a system where clients select freelancers based on service categories.', pill: 'In Progress' },
  { id: 2, title: 'GetItDone', tag: 'Full Stack', desc: 'Currently Developing a system where clients select freelancers based on service categories.', pill: 'Demo' },
  { id: 3, title: 'GetItDone', tag: 'Full Stack', desc: 'Currently Developing a system where clients select freelancers based on service categories.', pill: 'Design' }
]

export default function Projects() {
  return (
    <section className={styles.wrapper} id="projects">
      <div className={styles.headerRow}>
        <h2 className={styles.header}>PROJECTS</h2>
        <a href="/projects" className={styles.seeAll} aria-label="See all projects">See All</a>
      </div>

      <div className={styles.grid}>
        {projects.map((p, i) => (
          <article key={p.id} className={`${styles.card} ${i === 1 ? styles.active : ''}`}>
            <div className={styles.media} role="img" aria-label={`${p.title} screenshot`} />
            <div className={styles.cardBody}>
              <div className={styles.cardHead}>
                <div>
                  <div className={styles.title}>{p.title}</div>
                  <div className={styles.tag}>{p.tag}</div>
                </div>
                <div className={styles.pill}>{p.pill}</div>
              </div>
              <p className={styles.desc}>{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
