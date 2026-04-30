import React from 'react';
import styles from './Experience.module.css';
import { motion } from 'framer-motion';
import Image from 'next/image';

const experiences = [
  {
    title: 'Samsung PRISM',
    org: 'Samsung R&D Institute India',
    date: 'Internship',
    logo: 'samsung',
    desc: `Worked on network traffic analysis and ML pipelines at Samsung PRISM, with a focus on scale, behavior, and system reliability.`,
    mobileDesc: `Worked on network traffic and ML pipelines at Samsung PRISM with a focus on reliability.`,
    certificate: '#'
  },
  {
    title: 'iOS Developer Intern',
    org: 'Infosys',
    date: 'Internship',
    logo: 'infosys',
    desc: `Built parts of a fleet management iOS app at Infosys, focusing on onboarding flows and reusable SwiftUI components.`,
    mobileDesc: `Built parts of a fleet management iOS app with SwiftUI and onboarding flows.`,
    certificate: '#'
  },
  {
    title: 'iOS Developer Program',
    org: 'Apple x Infosys',
    date: 'Participant',
    logo: 'apple',
    desc: `The Apple x Infosys program pushed me toward cleaner mobile implementation, stronger polish, and better product thinking.`,
    mobileDesc: `A program that strengthened my mobile product thinking and implementation quality.`,
    certificate: '#'
  }
];

export default function Experience() {
  const displayExperiences = experiences;
  
  const renderLogo = (logo, shouldFill) => {
    let src = '';
    let alt = '';

    if (logo === 'infosys') {
      src = '/assets/infosysintern.png';
      alt = 'Infosys';
    } else if (logo === 'apple') {
      src = '/assets/apple.png';
      alt = 'Apple';
    } else if (logo === 'samsung') {
      src = '/assets/Samsungprism.png';
      alt = 'Samsung';
    }

    if (src) {
      return (
        <div className={styles.logoWrap}>
          <Image 
            src={src} 
            alt={alt} 
            fill 
            className={shouldFill ? styles.logoImgFill : styles.logoImgContain} 
          />
        </div>
      );
    }
    return null;
  };

  return (
    <section className={styles.wrapper} id="experience">
      <motion.div
        className={styles.headerRow}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className={styles.header}>Where I Learned</h2>
      </motion.div>
      <motion.div 
        className={styles.timeline}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.1
            }
          }
        }}
      >
        {displayExperiences.map((exp) => (
          <motion.article
            className={styles.item}
            key={`${exp.title}-${exp.org}`}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }
            }}
          >
            <div className={styles.card}>
              {renderLogo(exp.logo, exp.logo === 'apple')}
              <div className={styles.itemHeader}>
                <h3 className={styles.itemTitle}>{exp.title}</h3>
                <div className={styles.itemOrg}>{exp.org}</div>
              </div>
              <div className={styles.itemDescGroup}>
                <p className={`${styles.itemDesc} ${styles.itemDescDesktop}`}>{exp.desc}</p>
                <p className={`${styles.itemDesc} ${styles.itemDescMobile}`}>{exp.mobileDesc || exp.desc}</p>
              </div>
              {exp.certificate && (
                <div className={styles.certWrapper}>
                  <a 
                    href={exp.certificate} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.certBtn}
                  >
                    Verify Certificate
                  </a>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
