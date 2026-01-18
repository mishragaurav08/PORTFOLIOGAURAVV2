import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import styles from '../../components/Thoughts/Thoughts.module.css';
import thoughtsData from '../../components/Thoughts/thoughtsData.json';
import Footer from '../../components/Footer/Footer';
import SEO from '../../components/SEO';
import ScrollProgress from '../../components/ScrollProgress/ScrollProgress';
import Contact from '../../components/Contact/Contact';

export default function ThoughtPage() {
  const router = useRouter();
  const { slug } = router.query;

  const thought = thoughtsData.find((t) => t.slug === slug);

  const handleBack = () => {
    router.push('/');
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
      <SEO 
        title={`${thought.title} - Gaurav's Thoughts`}
        description={thought.excerpt || thought.title}
        keywords={`${thought.title}, blog, thoughts, insights, UX design, frontend development`}
        canonicalUrl={`https://gauravmishra.dev/thoughts/${slug}`}
        ogType="article"
      />
      
      <section className={styles.wrapper} id="thought-detail">
        <ScrollProgress />
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
              style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}
              aria-hidden="true"
            >
              <FontAwesomeIcon icon={faReply} size="lg" />
            </motion.span>
          </motion.button>
          <h1 className={styles.thoughtTitle}>{thought.title}</h1>
        </motion.div>

        <div className={styles.thoughtCard}>
          <article className={styles.thoughtContent}>
            {thought.content.map((block, index) => {
              if (block.type === 'paragraph') {
                // Render **bold** markers inside paragraph text as <strong>
                const parts = block.text.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={index} className={styles.contentParagraph}>
                    {parts.map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                    )}
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

        {/* Suggestions: show other thoughts at the end */}
        {(() => {
          const others = thoughtsData.filter((t) => t.slug !== slug);
          if (!others || others.length === 0) return null;
          return (
            <section className={styles.moreWrapper} aria-label="More thoughts">
              <h3 className={styles.moreHeading}>More from Thoughts</h3>
              <div className={styles.grid}>
                {others.map((o) => (
                  <article key={o.id} className={styles.card}>
                    <div className={styles.cardContent}>
                      <h4 className={styles.title}>{o.title}</h4>
                      {!o.comingSoon && <p className={styles.excerpt}>{o.excerpt}</p>}
                    </div>
                    {o.comingSoon ? (
                      <div className={styles.comingSoonBadge}>
                        <span>Coming Soon</span>
                      </div>
                    ) : (
                      <Link href={`/thoughts/${o.slug}`} legacyBehavior>
                        <a className={styles.readMore} aria-label={`Read ${o.title}`}>
                          <span className={styles.readText}>Read</span>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.arrow} aria-hidden />
                        </a>
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })()}
      </section>
      
      <Contact />
      <Footer />
    </>
  );
}
