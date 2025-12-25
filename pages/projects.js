import React from 'react';
import styles from '../components/Projects/Projects.module.css';
import projectsData from '../components/Projects/projects.json';
import CTAButton from '../components/Projects/CTAButton';
// import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function ProjectsPage() {
  const router = useRouter();
  return (
    <>
      <section className={styles.wrapper} id="projects-page">
        <motion.div
          className={styles.headerRow}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          style={{ marginBottom: 'clamp(40px, 7vw, 72px)' }}
        >
          <button
            onClick={() => router.back()}
            className={styles.backIconBtn}
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 17L9.5 12L14.5 7" stroke="var(--neon)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className={styles.header}>PROJECTS</h2>
          <div className={styles.ruleWrapper} aria-hidden>
            <div className={styles.rule} />
          </div>
        </motion.div>
        <div className={styles.grid}>
          {projectsData.map((p, i) => (
            <div key={p.id} className={styles.card}>
              <div className={styles.media} aria-label={`${p.title} project preview`}>
                <img
                  src={p.image || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80'}
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
            </div>
          ))}
        </div>
      </section>
      {/* <Contact /> */}
      <Footer />
    </>
  );
}
