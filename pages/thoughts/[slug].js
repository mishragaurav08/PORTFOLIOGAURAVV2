import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import styles from '../../components/Thoughts/Thoughts.module.css';
import thoughtsData from '../../components/Thoughts/thoughtsData.json';
import Footer from '../../components/Footer/Footer';

export default function ThoughtPage() {
  const router = useRouter();
  const { slug } = router.query;

  const thought = thoughtsData.find((t) => t.slug === slug);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/#thoughts');
    }
  };

  if (!thought) {
    return (
      <div className={styles.wrapper}>
        <h1>Thought not found</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{thought.title} - Gaurav</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <section className={styles.wrapper} id="thought-detail">
        <motion.div
          className={styles.headerRow}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          style={{ marginBottom: 'clamp(40px, 7vw, 72px)' }}
        >
          <motion.button
            onClick={handleBack}
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
          <div className={styles.thoughtHeader}>
            <h1 className={styles.thoughtTitle}>{thought.title}</h1>
          </div>
        </motion.div>

        <div className={styles.thoughtCard}>
          <article className={styles.thoughtContent}>
            {thought.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className={styles.contentParagraph}>
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={index} className={styles.contentHeading}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={index} className={styles.contentList}>
                    {block.items.map((item, i) => (
                      <li key={i} className={styles.contentListItem}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'images') {
                return (
                  <div key={index} className={styles.imageGrid}>
                    {block.images.map((img, i) => (
                      <img key={i} src={img} alt={`${thought.title} ${i + 1}`} className={styles.contentImage} />
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </article>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
