import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Experience from '../components/Experience/Experience'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import SEO from '../components/SEO'
import styles from '../components/Experience/Experience.module.css'

export default function ExperiencePage() {
  const router = useRouter()
  
  return (
    <>
      <SEO 
        title="Career Highlights - Gaurav | Professional Experience"
        description="Explore my professional journey including internships at Samsung, Apple × Infosys iOS Developer Program, and co-founding Studique. Computer Science student at SRMIST."
        keywords="career, professional experience, Samsung intern, Apple developer, Studique co-founder, SRMIST, work experience"
        canonicalUrl="https://gauravmishra.dev/experience"
      />
      <section className={styles.wrapper}>
        <motion.div
          className={styles.headerRow}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          style={{ marginBottom: 'clamp(40px, 7vw, 72px)' }}
        >
          <motion.button
            onClick={() => router.push('/#experience')}
            className={styles.backIconBtn}
            aria-label="Go back"
            whileHover="hover"
            whileTap="tap"
            initial="rest"
            animate="rest"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
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
          <h2 className={styles.header}>CAREER HIGHLIGHTS</h2>
        </motion.div>
        <Experience showHeader={false} wrap={false} />
      </section>
      <Contact />
      <Footer />
    </>
  )
}
