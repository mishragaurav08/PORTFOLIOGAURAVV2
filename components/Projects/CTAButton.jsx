import React from 'react';
import { HiCog, HiGlobeAlt } from 'react-icons/hi';
import { AiFillHighlight, AiFillGithub } from 'react-icons/ai';
import styles from './Projects.module.css';

const ICONS = {
  demo: <HiGlobeAlt />, 
  design: <AiFillHighlight />, 
  github: <AiFillGithub />, 
  inprogress: <HiCog className={styles.cogSpin} />, 
};

function getIcon(type) {
  if (type === 'inprogress') {
    return <HiCog className={styles.cogSpin} />;
  }
  return ICONS[type] || null;
}

const CTAButton = ({ type, href, children }) => {
  const baseClass = `${styles.ctaBtn} ${styles[type]}`;
  const isDisabled = type === 'inprogress';
  const icon = getIcon(type);

  if (isDisabled) {
    return (
      <button className={baseClass} disabled tabIndex={-1} aria-label={children}>
        <span className={styles.icon}>{icon}</span>
        {children}
      </button>
    );
  }
  return (
    <a
      className={baseClass}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${children}`}
    >
      <span className={styles.icon}>{icon}</span>
      {children}
    </a>
  );
};

export default CTAButton;