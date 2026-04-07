/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import styles from '../../components/Thoughts/Thoughts.module.css';
import thoughtsData from '../../components/Thoughts/thoughtsData.json';
import Footer from '../../components/Footer/Footer';
import Seo from '../../components/SEO';

export default function ThoughtPage({ thought }) {
  const router = useRouter();
  const { slug } = thought;

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [slug]);

  const handleBack = () => {
    if (globalThis.window !== undefined && globalThis.window.history.length > 1) {
      router.back();
      return;
    }
    router.push('/');
  };

  return (
    <>
      <Seo 
        title={`${thought.title} - Gaurav's Thoughts`}
        description={thought.excerpt || thought.title}
        keywords={`${thought.title}, blog, thoughts, insights, UX design, frontend development`}
        canonicalUrl={`https://gauravmishra.dev/thoughts/${slug}`}
        ogType="article"
      />
      
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
            {(() => {
              return thought.content.map((block) => {
                const blockKey = `${block.type}-${block.text || (block.items ? block.items.join('|') : '') || (block.images ? block.images.join('|') : '')}`;
                if (block.type === 'paragraph') {
                  const parts = block.text.split(/\*\*(.*?)\*\*/g);
                  let isBold = false;
                  const tokenCount = {};
                  return (
                    <p key={blockKey} className={styles.contentParagraph}>
                      {parts.map((part) => {
                        tokenCount[part] = (tokenCount[part] || 0) + 1;
                        const tokenKey = `${isBold ? 'b' : 't'}-${part}-${tokenCount[part]}`;
                        const node = isBold ? <strong key={tokenKey}>{part}</strong> : <span key={tokenKey}>{part}</span>;
                        isBold = !isBold;
                        return node;
                      })}
                    </p>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h2 key={blockKey} className={styles.contentHeading}>
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={blockKey} className={styles.contentList}>
                      {block.items.map((item, index) => {
                        return (
                          <li key={`${index}-${item}`} className={styles.contentListItem}>{item}</li>
                        );
                      })}
                    </ul>
                  );
                }
                if (block.type === 'images') {
                  // Carousel: duplicate images for seamless scroll
                  const carouselImgs = [...block.images, ...block.images];
                  return (
                    <div key={blockKey} className={styles.carouselWrap}>
                      <div className={styles.carouselTrack}>
                        {carouselImgs.map((img, i) => (
                          <div className={styles.carouselItem} key={img + '-' + i}>
                            <img
                              src={img}
                              alt={`${thought.title} visual`}
                              className={styles.carouselImg}
                              draggable={false}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              });
            })()}
          </article>
        </div>

        {/* Suggestions: show other thoughts at the end */}
        {(() => {
          const others = thoughtsData.filter((t) => t.slug !== thought.slug);
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
                      <Link
                        href={`/thoughts/${o.slug}`}
                        scroll
                        className={styles.readMore}
                        aria-label={`Read ${o.title}`}
                      >
                        <span className={styles.readText}>Read</span>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={styles.arrow} aria-hidden />
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })()}
      </section>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const paths = thoughtsData
    .filter((thought) => Boolean(thought.slug))
    .map((thought) => ({ params: { slug: thought.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const thought = thoughtsData.find((item) => item.slug === params?.slug);

  if (!thought) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      thought,
    },
  };
}
