import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faArrowUpRightFromSquare, faMicrophone, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import styles from '../../components/Thoughts/Thoughts.module.css';
import thoughtsData from '../../components/Thoughts/thoughtsData.json';
import Footer from '../../components/Footer/Footer';
import Seo from '../../components/SEO';
import Contact from '../../components/Contact/Contact';

// Helper to get all readable blocks in the rendered order
function getBlockRefs(content) {
  const refs = [];
  let idx = 0;
  content.forEach((block) => {
    if (block.type === 'heading' && block.text) {
      refs.push({ type: 'heading', idx, ref: React.createRef() });
      idx++;
    }
    if (block.type === 'paragraph' && block.text) {
      refs.push({ type: 'paragraph', idx, ref: React.createRef() });
      idx++;
    }
    if (block.type === 'list' && Array.isArray(block.items)) {
      block.items.forEach(() => {
        refs.push({ type: 'listItem', idx, ref: React.createRef() });
        idx++;
      });
    }
  });
  return refs;
}

export default function ThoughtPage() {
  const router = useRouter();
  const isThoughtRoute = router.pathname === '/thoughts/[slug]' || router.pathname === '/[slug]';

  const { slug } = router.query;
  const thought = thoughtsData.find((t) => t.slug === slug);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState([]);
  const stopRequestedRef = useRef(false);
  const fallbackTriedRef = useRef(false);
  // For auto-scroll
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const blockRefs = useMemo(() => thought ? getBlockRefs(thought.content) : [], [thought]);
  const hasSpeechApi = (
    globalThis.window !== undefined
    && 'speechSynthesis' in globalThis.window
    && 'SpeechSynthesisUtterance' in globalThis.window
  );
  const isPhoneDevice = useMemo(() => {
    if (globalThis.window === undefined) return false;

    const ua = globalThis.navigator?.userAgent || '';
    const isPhoneUa = /Android|iPhone|iPod|Windows Phone|Mobile/i.test(ua);
    const isSmallTouchViewport = globalThis.window.matchMedia('(max-width: 900px)').matches
      && (globalThis.navigator?.maxTouchPoints || 0) > 0;

    return isPhoneUa || isSmallTouchViewport;
  }, []);
  const isTtsAllowed = isThoughtRoute && !isPhoneDevice;

  const stripMarkdown = useCallback((text = '') => {
    return text.replaceAll(/\*\*(.*?)\*\*/g, '$1').replaceAll(/\s+/g, ' ').trim();
  }, []);

  const readableLines = useMemo(() => {
    if (!thought?.content) return [];

    const lines = [];

    thought.content.forEach((block) => {
      if (block.type === 'heading' && block.text) {
        lines.push(stripMarkdown(block.text));
      }

      if (block.type === 'paragraph' && block.text) {
        lines.push(stripMarkdown(block.text));
      }

      if (block.type === 'list' && Array.isArray(block.items)) {
        block.items.forEach((item) => {
          const cleaned = stripMarkdown(item);
          if (cleaned) lines.push(cleaned);
        });
      }
    });

    return lines;
  }, [stripMarkdown, thought]);

  const preferredVoice = useMemo(() => {
    if (!voices.length) return null;

    const scoreVoice = (voice) => {
      const lang = (voice.lang || '').toLowerCase();
      const voicePrint = `${voice.name} ${voice.voiceURI || ''}`.toLowerCase();
      let score = 0;

      if (lang === 'en-in') score += 120;
      if (lang.startsWith('en-in')) score += 95;
      if (lang === 'hi-in' || lang.startsWith('hi-in')) score += 65;
      if (voicePrint.includes('india') || voicePrint.includes('indian')) score += 80;
      if (voicePrint.includes('ravi') || voicePrint.includes('aditya') || voicePrint.includes('rahul') || voicePrint.includes('arjun') || voicePrint.includes('heera') || voicePrint.includes('rishi')) score += 55;
      if (voicePrint.includes('male') || voicePrint.includes('man')) score += 30;
      if (voicePrint.includes('female') || voicePrint.includes('woman') || voicePrint.includes('samantha') || voicePrint.includes('veena')) score -= 35;

      return score;
    };

    const ranked = [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
    return ranked[0] || voices[0];
  }, [voices]);

  const stopReading = useCallback(() => {
    if (!hasSpeechApi) return;

    stopRequestedRef.current = true;
    globalThis.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
  }, [hasSpeechApi]);

  const speakLine = useCallback((index, forceDefaultVoice = false) => {
    if (!hasSpeechApi) return;

    if (index < 0 || index >= readableLines.length) {
      setIsReading(false);
      setIsPaused(false);
      setCurrentLineIndex(-1);
      return;
    }

    setCurrentLineIndex(index);

    const utterance = new SpeechSynthesisUtterance(readableLines[index]);
    utterance.rate = 0.94;
    utterance.pitch = 0.93;
    utterance.volume = 1;
    utterance.lang = forceDefaultVoice
      ? 'en-US'
      : (preferredVoice?.lang || globalThis.navigator?.language || 'en-US');

    if (!forceDefaultVoice && preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsReading(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      if (stopRequestedRef.current) return;
      speakLine(index + 1, false);
    };

    utterance.onerror = () => {
      if (!forceDefaultVoice && !fallbackTriedRef.current && !stopRequestedRef.current) {
        fallbackTriedRef.current = true;
        speakLine(index, true);
        return;
      }
      setIsReading(false);
      setIsPaused(false);
      setCurrentLineIndex(-1);
    };

    globalThis.speechSynthesis.speak(utterance);
  }, [hasSpeechApi, preferredVoice, readableLines]);

  const startReading = useCallback(() => {
    if (!isTtsAllowed || !isSpeechSupported || readableLines.length === 0 || !hasSpeechApi) return;

    stopRequestedRef.current = false;
    fallbackTriedRef.current = false;
    globalThis.speechSynthesis.cancel();
    globalThis.speechSynthesis.resume();
    if (voices.length === 0) {
      setVoices(globalThis.speechSynthesis.getVoices());
    }
    setIsReading(true);
    setIsPaused(false);

    // Mobile Chrome can need a tiny "warm-up" utterance before real speech starts.
    const warmup = new SpeechSynthesisUtterance(' ');
    warmup.volume = 0;
    warmup.rate = 1;
    warmup.pitch = 1;
    warmup.lang = globalThis.navigator?.language || 'en-US';

    warmup.onend = () => {
      if (!stopRequestedRef.current) {
        speakLine(0, false);
      }
    };

    warmup.onerror = () => {
      if (!stopRequestedRef.current) {
        speakLine(0, true);
      }
    };

    globalThis.setTimeout(() => {
      if (stopRequestedRef.current) return;
      try {
        globalThis.speechSynthesis.speak(warmup);
      } catch {
        speakLine(0, true);
      }
    }, 60);

    globalThis.setTimeout(() => {
      if (stopRequestedRef.current) return;
      if (!globalThis.speechSynthesis.speaking && !globalThis.speechSynthesis.pending) {
        fallbackTriedRef.current = true;
        speakLine(0, true);
      }
    }, 900);
  }, [hasSpeechApi, isSpeechSupported, isTtsAllowed, readableLines.length, speakLine, voices.length]);

  const pauseReading = useCallback(() => {
    if (!hasSpeechApi || !isReading) return;
    globalThis.speechSynthesis.pause();
    setIsPaused(true);
  }, [hasSpeechApi, isReading]);

  const resumeReading = useCallback(() => {
    if (!hasSpeechApi || !isReading) return;
    globalThis.speechSynthesis.resume();
    setIsPaused(false);
  }, [hasSpeechApi, isReading]);

  // Auto-scroll to current block
  useEffect(() => {
    if (currentLineIndex < 0 || !blockRefs[currentLineIndex]) return;
    const node = blockRefs[currentLineIndex].ref.current;
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentLineIndex, blockRefs]);

  useEffect(() => {
    setIsSpeechSupported(hasSpeechApi);
  }, [hasSpeechApi]);

  useEffect(() => {
    if (!hasSpeechApi) return undefined;

    const synthesis = globalThis.speechSynthesis;

    const updateVoices = () => {
      setVoices(synthesis.getVoices());
    };

    updateVoices();

    if (typeof synthesis.addEventListener === 'function') {
      synthesis.addEventListener('voiceschanged', updateVoices);
    } else {
      synthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof synthesis.removeEventListener === 'function') {
        synthesis.removeEventListener('voiceschanged', updateVoices);
      } else {
        synthesis.onvoiceschanged = null;
      }
    };
  }, [hasSpeechApi]);

  useEffect(() => {
    stopReading();
    setCurrentLineIndex(-1);
  }, [stopReading, slug]);

  useEffect(() => {
    if (isTtsAllowed) return;
    stopReading();
    setCurrentLineIndex(-1);
  }, [isTtsAllowed, stopReading]);

  useEffect(() => {
    if (globalThis.window === undefined) return;

    const forceTop = () => {
      globalThis.window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    forceTop();
    const rafId = globalThis.requestAnimationFrame(() => {
      forceTop();
    });
    const timeoutId = globalThis.setTimeout(() => {
      forceTop();
    }, 120);

    return () => {
      globalThis.cancelAnimationFrame(rafId);
      globalThis.clearTimeout(timeoutId);
    };
  }, [slug]);

  useEffect(() => {
    return () => {
      if (hasSpeechApi) {
        globalThis.speechSynthesis.cancel();
      }
    };
  }, [hasSpeechApi]);

  const handleBack = () => {
    router.push('/');
  };

  // Instantly render the page, no lazy loading

  if (!thought) return null;

  return (
    <>
      <Seo 
        title={`${thought.title} - Gaurav's Thoughts`}
        description={thought.excerpt || thought.title}
        keywords={`${thought.title}, blog, thoughts, insights, UX design, frontend development`}
        canonicalUrl={`https://gauravmishra.dev/${slug}`}
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
              let refIdx = 0;
              return thought.content.map((block) => {
                const blockKey = `${block.type}-${block.text || (block.items ? block.items.join('|') : '') || (block.images ? block.images.join('|') : '')}`;
                if (block.type === 'paragraph') {
                  const parts = block.text.split(/\*\*(.*?)\*\*/g);
                  let isBold = false;
                  const tokenCount = {};
                  const ref = blockRefs[refIdx]?.ref;
                  const idx = refIdx;
                  refIdx++;
                  return (
                    <p key={blockKey} ref={ref} className={styles.contentParagraph + (currentLineIndex === idx ? ' ' + styles.activeReading : '')}>
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
                  const ref = blockRefs[refIdx]?.ref;
                  const idx = refIdx;
                  refIdx++;
                  return (
                    <h2 key={blockKey} ref={ref} className={styles.contentHeading + (currentLineIndex === idx ? ' ' + styles.activeReading : '')}>
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={blockKey} className={styles.contentList}>
                      {block.items.map((item, i) => {
                        const ref = blockRefs[refIdx]?.ref;
                        const idx = refIdx;
                        refIdx++;
                        return (
                          <li key={item} ref={ref} className={styles.contentListItem + (currentLineIndex === idx ? ' ' + styles.activeReading : '')}>{item}</li>
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
                      <Link
                        href={`/${o.slug}`}
                        className={styles.readMore}
                        aria-label={`Read ${o.title}`}
                        onClick={() => {
                          if (globalThis.window !== undefined) {
                            globalThis.window.scrollTo(0, 0);
                          }
                        }}
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

      {isTtsAllowed && (
      <div className={styles.readerFabWrap} aria-live="polite">
        {!isReading && (
          <button
            type="button"
            className={styles.readerFabPrimary}
            onClick={startReading}
            disabled={readableLines.length === 0}
            aria-label="Read this thought for me"
            title={isSpeechSupported ? 'Read this thought for me' : 'Audio reader is not supported on this browser'}
          >
            <FontAwesomeIcon icon={faMicrophone} className={styles.readerFabIcon} aria-hidden />
            <span>{isSpeechSupported ? 'Read for me' : 'Audio unavailable'}</span>
          </button>
        )}

        {isReading && (
          <div className={styles.readerFabActions}>
            {isPaused ? (
              <button type="button" className={styles.readerFabBtn} onClick={resumeReading}>
                <FontAwesomeIcon icon={faPlay} className={styles.readerFabActionIcon} aria-hidden />
                Resume
              </button>
            ) : (
              <button type="button" className={styles.readerFabBtn} onClick={pauseReading}>
                <FontAwesomeIcon icon={faPause} className={styles.readerFabActionIcon} aria-hidden />
                Pause
              </button>
            )}
            <button type="button" className={styles.readerFabBtn} onClick={stopReading}>
              <FontAwesomeIcon icon={faStop} className={styles.readerFabActionIcon} aria-hidden />
              Stop
            </button>
          </div>
        )}
      </div>
      )}
      
      <Contact />
      <Footer />
    </>
  );
}
