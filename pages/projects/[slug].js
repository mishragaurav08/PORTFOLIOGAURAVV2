import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faCode, faDatabase, faServer, faMobileAlt, faCloud, faPalette, faWind, faTerminal, faBolt, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faReact, faNodeJs, faSwift, faFigma, faAws, faStripe, faDocker, faApple, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from '../../components/Thoughts/Thoughts.module.css';
import pStyles from '../../components/Projects/ProjectDetail.module.css';
import projectsData from '../../data/projects.json';
import Footer from '../../components/Footer/Footer';
import Seo from '../../components/SEO';
import CTAButton from '../../components/Projects/CTAButton';
import * as analytics from '../../lib/analytics';

// Direct imports for reliable image loading
import studiqueImg from '../../public/assets/studique.png';
import interactImg from '../../public/assets/interact.png';
import getitdoneImg from '../../public/assets/getitdone.png';
import herspaceImg from '../../public/assets/herspace.png';
import srmconnectImg from '../../public/assets/srmconnect.png';
import socialmediaImg from '../../public/assets/socialmedia.png';

const IMAGE_MAP = {
  '/assets/studique.png': studiqueImg,
  '/assets/interact.png': interactImg,
  '/assets/getitdone.png': getitdoneImg,
  '/assets/herspace.png': herspaceImg,
  '/assets/srmconnect.png': srmconnectImg,
  '/assets/socialmedia.png': socialmediaImg,
};

function scrollToPageTop() {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const appRoot = document.getElementById('__next');
  if (appRoot) appRoot.scrollTop = 0;
  const scroller = document.scrollingElement;
  if (scroller) scroller.scrollTop = 0;
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const getTechIcon = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return faReact;
  if (t.includes('next.js')) return faCode;
  if (t.includes('node')) return faNodeJs;
  if (t.includes('swift')) return faSwift;
  if (t.includes('figma')) return faFigma;
  if (t.includes('tailwind')) return faWind;
  if (t.includes('database') || t.includes('mongo') || t.includes('postgre') || t.includes('firestore') || t.includes('core data')) return faDatabase;
  if (t.includes('aws') || t.includes('amplify') || t.includes('cloudfront')) return faAws;
  if (t.includes('stripe')) return faStripe;
  if (t.includes('docker')) return faDocker;
  if (t.includes('ios') || t.includes('apple')) return faApple;
  if (t.includes('google') || t.includes('firebase')) return faGoogle;
  if (t.includes('terminal') || t.includes('cli')) return faTerminal;
  if (t.includes('server') || t.includes('express')) return faServer;
  if (t.includes('mobile')) return faMobileAlt;
  if (t.includes('design') || t.includes('palette')) return faPalette;
  if (t.includes('bolt') || t.includes('fast')) return faBolt;
  if (t.includes('layer') || t.includes('stack')) return faLayerGroup;
  return faCode; // Default
};

export default function ProjectPage({ project }) {
  const router = useRouter();
  const { slug } = project;
  const projectUrl = `https://gauravmishra.dev/projects/${slug}`;

  useIsomorphicLayoutEffect(() => {
    scrollToPageTop();
  }, [slug]);

  React.useEffect(() => {
    analytics.trackProjectView(project.title);
  }, [project.title]);

  const handleBack = () => {
    router.push('/#projects');
  };

  const tech = project.techStackDetailed || {};
  const allTech = [
    ...(tech.frontend || []),
    ...(tech.backend || []),
    ...(tech.database || []),
    ...(tech.other || []),
  ].filter(Boolean);

  return (
    <>
      <Seo
        title={`${project.title} | Gaurav Mishra`}
        description={project.desc}
        keywords={`${project.title}, ${project.tag}, Gaurav Mishra portfolio`}
        canonicalUrl={projectUrl}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: project.title,
            description: project.desc,
            applicationCategory: project.tag,
            author: { '@type': 'Person', name: 'Gaurav Mishra', url: 'https://gauravmishra.dev' },
            url: projectUrl,
            image: `https://gauravmishra.dev${project.image}`,
          }),
        }}
      />

      <section className={styles.wrapper} id="project-detail">
        <motion.div
          className={styles.detailHeaderRow}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.button
            onClick={handleBack}
            className={styles.backIconBtn}
            aria-label="Go back"
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
                tap: { x: -1 }
              }}
              style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}
              aria-hidden="true"
            >
              <FontAwesomeIcon icon={faReply} size="lg" />
            </motion.span>
          </motion.button>
          <div className={styles.titleWrap}>
            <h1 className={styles.thoughtTitle}>{project.title}</h1>
          </div>
        </motion.div>

        {slug !== 'studique' ? (
          <div className={styles.thoughtCard} style={{ textAlign: 'center', padding: '80px 20px' }}>
            <h2 className={styles.contentHeading} style={{ marginTop: 0 }}>Coming Soon</h2>
            <p className={styles.contentParagraph}>
              I'm currently putting together the story for this project. Check back soon!
            </p>
          </div>
        ) : (
          <div className={styles.thoughtCard}>
            <article className={styles.thoughtContent}>

            {/* 1. Overview */}
            {project.overview && (
              <>
                <h2 className={styles.contentHeading}>The Story</h2>
                <p className={styles.contentParagraph}>{project.overview}</p>
              </>
            )}

            {/* 2. Problem */}
            {project.problem && (
              <>
                <h2 className={styles.contentHeading}>The Problem</h2>
                <p className={styles.contentParagraph}>{project.problem}</p>
              </>
            )}

            {/* 3. Solution */}
            {project.solution && (
              <>
                <h2 className={styles.contentHeading}>My Approach</h2>
                <p className={styles.contentParagraph}>{project.solution}</p>
              </>
            )}

            {/* 4. Impact */}
            {project.impact && (
              <>
                <h2 className={styles.contentHeading}>The Impact</h2>
                <p className={styles.contentParagraph}>{project.impact}</p>
              </>
            )}

            {/* 5. Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <>
                <h2 className={styles.contentHeading}>Visuals</h2>
                <div className={pStyles.screenshotRow}>
                  {project.screenshots.slice(0, 3).map((img, i) => (
                    <div key={i} className={pStyles.screenshotItem}>
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        className={pStyles.screenshotImg}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 6. Features */}
            {project.features && project.features.length > 0 && (
              <>
                <h2 className={styles.contentHeading}>Core Features</h2>
                <ul className={styles.contentList}>
                  {project.features.map((f, i) => (
                    <li key={i} className={styles.contentListItem}>{f}</li>
                  ))}
                </ul>
              </>
            )}

            {/* 7. Behind the Scenes (How it works) */}
            {project.howItWorks && (
              <>
                <h2 className={styles.contentHeading}>Behind the Scenes</h2>
                <p className={styles.contentParagraph}>{project.howItWorks}</p>
              </>
            )}

            {/* 8. Tech Stack */}
            {project.techStackDetailed && (
              <>
                <h2 className={styles.contentHeading}>Tech Stack</h2>
                <div className={pStyles.techPills}>
                  {Object.entries(project.techStackDetailed).map(([category, items]) =>
                    items.map((item, i) => (
                      <span key={`${category}-${i}`} className={pStyles.techPill}>
                        <FontAwesomeIcon icon={getTechIcon(item)} className={pStyles.techIcon} />
                        {item}
                      </span>
                    ))
                  )}
                </div>
              </>
            )}

            {/* 9. Team */}
            {project.team && project.team.length > 0 && (
              <>
                <h2 className={styles.contentHeading}>Team</h2>
                <div className={pStyles.teamGrid}>
                  {project.team.map((member, i) => {
                    const CardContent = (
                      <>
                        {member.image && (
                          <div className={pStyles.teamAvatar}>
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={48}
                              height={48}
                              className={pStyles.teamAvatarImg}
                            />
                          </div>
                        )}
                        <div className={pStyles.teamInfo}>
                          <span className={pStyles.teamName}>{member.name}</span>
                          <span className={pStyles.teamRole}>{member.role}</span>
                        </div>
                      </>
                    );

                    if (member.linkedin && member.linkedin !== '#') {
                      return (
                        <a
                          key={i}
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${pStyles.teamCard} ${pStyles.teamCardLink}`}
                          aria-label={`View ${member.name}'s LinkedIn profile`}
                        >
                          {CardContent}
                        </a>
                      );
                    }

                    return (
                      <div key={i} className={pStyles.teamCard}>
                        {CardContent}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </article>
        </div>
      )}
      </section>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const paths = projectsData
    .filter((p) => Boolean(p.slug))
    .map((p) => ({ params: { slug: p.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = projectsData.find((p) => p.slug === params?.slug);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: { project },
  };
}
