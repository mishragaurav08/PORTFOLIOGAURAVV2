import React from 'react';
import styles from '../components/Projects/Projects.module.css';
import projectsData from '../components/Projects/projects.json';
import CTAButton from '../components/Projects/CTAButton';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function ProjectsPage() {
  const router = useRouter();
  return (
    <>
      <SEO 
        title="Projects - Gaurav | UX/UI Design & Development Portfolio"
        description="Explore my portfolio of UX/UI design and frontend development projects including Studique (15,000+ users), interactive web applications, and more."
        keywords="UX projects, UI design portfolio, web development projects, React projects, Next.js projects, frontend portfolio"
        canonicalUrl="https://gauravmishra.dev/projects"
      />
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
            onClick={() => router.push('/#projects')}
            className={styles.backIconBtn}
            aria-label="Go back"
            whileHover="hover"
            whileTap="tap"
            initial="rest"
            animate="rest"
            variants={{}}
          >
          <motion.span
            className={styles.backIconSvg}
            initial={{ x: 0 }}
            variants={{
              rest: { x: 0 },
              hover: { x: -3, transition: { type: 'spring', stiffness: 300, damping: 18 } },
              tap: { x: -1 }
            }}
            style={{ color: 'var(--accent)', display: 'inline-flex' }}
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </motion.span>
          </motion.button>
          <h2 className={styles.header}>ALL WORKS</h2>
          <div className={styles.ruleWrapper} aria-hidden="true">
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
      <Contact />
      <Footer />
    </>
  );
}
