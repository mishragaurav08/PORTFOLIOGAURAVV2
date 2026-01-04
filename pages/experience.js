import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Experience from '../components/Experience/Experience'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import styles from '../components/Experience/Experience.module.css'

export default function ExperiencePage() {
  const router = useRouter()
  
  return (
    <>
      <Head>
        <title>CAREER HIGHLIGHTS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
            onClick={() => router.back()}
            className={styles.backIconBtn}
            aria-label="Go back"
            whileHover="hover"
            whileTap="tap"
            initial="rest"
            animate="rest"
          >
            <motion.svg
              width="32" height="32" viewBox="0 0 32 32" fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          <h2 className={styles.header}>CAREER HIGHLIGHTS</h2>
          <div className={styles.ruleWrapper} aria-hidden>
            <div className={styles.rule} />
          </div>
        </motion.div>
        <Experience showHeader={false} wrap={false} />
      </section>
      <Contact />
      <Footer />
    </>
  )
}
