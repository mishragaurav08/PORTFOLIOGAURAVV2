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
          <motion.button
            onClick={() => router.back()}
            className={styles.backIconBtn}
            aria-label="Go back"
            whileHover="hover"
            whileTap="tap"
            initial="rest"
            animate="rest"
            variants={{}}
          >
            <motion.svg
              width="32" height="32" viewBox="0 0 32 32" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.backIconSvg}
            >
              <motion.path
                d="M19.5 23L12.5 16L19.5 9"
                stroke="var(--neon)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ x: 0 }}
                variants={{
                  rest: { x: 0 },
                  hover: { x: -3, transition: { type: 'spring', stiffness: 300, damping: 18 } },
                  tap: { x: -1 }
                }}
              />
            </motion.svg>
          </motion.button>
          <h2 className={styles.header}>My work</h2>
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
            </div>
          ))}
        </div>
      </section>
      {/* <Contact /> */}
      <Footer />
    </>
  );
}
