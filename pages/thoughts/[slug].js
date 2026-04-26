import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import styles from '../../components/Thoughts/Thoughts.module.css';
import thoughtsData from '../../components/Thoughts/thoughtsData.json';
import Footer from '../../components/Footer/Footer';
import Seo from '../../components/SEO';
import * as analytics from '../../lib/analytics';

function scrollToPageTop() {
  if (typeof window === 'undefined') return;

  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const appRoot = document.getElementById('__next');
  if (appRoot) {
    appRoot.scrollTop = 0;
  }

  const scroller = document.scrollingElement;
  if (scroller) {
    scroller.scrollTop = 0;
  }
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function ThoughtPage({ thought }) {
  const router = useRouter();
  const { slug } = thought;
  const articleUrl = `https://gauravmishra.dev/thoughts/${slug}`;
  const publishedDateIso = toIsoDate(thought.date);

  useIsomorphicLayoutEffect(() => {
    scrollToPageTop();
  }, [slug]);

  const enhancedContent = React.useMemo(() => {
    const content = Array.isArray(thought.content) ? thought.content : [];
    if (content.length < 9) return content;

    const out = [];
    let paragraphRun = 0;

    content.forEach((block, idx) => {
      out.push(block);

      if (block.type === 'heading') {
        paragraphRun = 0;
        return;
      }

      if (block.type === 'paragraph') {
        paragraphRun += 1;
      } else {
        paragraphRun = 0;
      }

      const isLast = idx === content.length - 1;
      if (!isLast && paragraphRun >= 3) {
        out.push({ type: 'divider' });
        paragraphRun = 0;
      }
    });

    return out;
  }, [thought.content]);

  const handleBack = () => {
    if (
      typeof window !== 'undefined' &&
      window.history.length > 1 &&
      typeof document !== 'undefined' &&
      document.referrer.startsWith(window.location.origin)
    ) {
      router.back();
      return;
    }
    router.push('/#thoughts');
  };

  return (
    <>
      <Seo 
        title={`${thought.title} - Gaurav's Thoughts`}
        description={thought.excerpt || thought.title}
        keywords={`${thought.title}, blog, thoughts, insights, UX design, frontend development`}
        canonicalUrl={articleUrl}
        ogType="article"
      />
      <SeoArticleSchema
        title={thought.title}
        description={thought.excerpt || thought.title}
        datePublished={publishedDateIso}
        url={articleUrl}
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
          <div className={styles.titleWrap}>
            <h1 className={styles.thoughtTitle}>{thought.title}</h1>
          </div>
        </motion.div>

        <div className={styles.thoughtCard}>
          <article className={styles.thoughtContent}>
            {(() => {
              return enhancedContent.map((block) => {
                const blockKey = `${block.type}-${block.text || (block.items ? block.items.join('|') : '') || (block.images ? block.images.join('|') : '')}`;
                if (block.type === 'paragraph') {
                  const parts = block.text.split(/\*\*(.*?)\*\*/g);
                  let isBold = false;
                  const tokenCount = {};
                  return (
                    <p
                      key={blockKey}
                      className={styles.contentParagraph}
                    >
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
                  const loopImages = block.images.length > 1
                    ? [...block.images, ...block.images]
                    : block.images;
                  return (
                    <div key={blockKey} className={styles.carouselWrap}>
                      <div className={styles.carouselTrack}>
                        {loopImages.map((img, i) => {
                          const isClone = i >= block.images.length;
                          return (
                          <div
                            className={`${styles.carouselItem} ${isClone ? styles.carouselItemClone : ''}`}
                            key={img + '-' + i}
                            aria-hidden={isClone ? 'true' : undefined}
                          >
                            <Image
                              src={img}
                              alt={isClone ? '' : `${thought.title} visual`}
                              className={styles.carouselImg}
                              fill
                              sizes="(max-width: 480px) 86vw, (max-width: 768px) 82vw, 520px"
                              loading="lazy"
                            />
                          </div>
                        )})}
                      </div>
                    </div>
                  );
                }
                if (block.type === 'divider') {
                  return <div key={`${blockKey}-divider`} className={styles.contentDivider} aria-hidden="true" />;
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
                        className={styles.readMore}
                        aria-label={`Read ${o.title}`}
                        onClick={() => analytics.trackCtaClick(`Read Thought - ${o.title}`)}
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

function SeoArticleSchema({ title, description, datePublished, url }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description,
          datePublished,
          dateModified: datePublished,
          author: {
            '@type': 'Person',
            name: 'Gaurav Mishra',
            url: 'https://gauravmishra.dev',
          },
          publisher: {
            '@type': 'Person',
            name: 'Gaurav Mishra',
            url: 'https://gauravmishra.dev',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
          },
          image: 'https://gauravmishra.dev/icon.png',
          url,
        }),
      }}
    />
  );
}

function toIsoDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }
  return parsed.toISOString();
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
