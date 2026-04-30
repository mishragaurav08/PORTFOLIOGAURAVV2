import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCog, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFigma, faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from './Projects.module.css';
import * as analytics from '../../lib/analytics';

const ICONS = {
  demo: faLink,
  design: faFigma,
  github: faGithub,
  inprogress: faCog,
  private: faLock,
};

function getIcon(type) {
  const icon = ICONS[type];
  if (!icon) return null;
  return <FontAwesomeIcon icon={icon} spin={type === 'inprogress'} />;
}

const CTAButton = ({ type, href, children, projectTitle }) => {
  const isPrivate = type === 'private';
  const isInProgress = type === 'inprogress';
  
  // A button is "actually" disabled if it's private OR if it's inprogress
  const isDisabled = isPrivate || isInProgress || (!href && !isInProgress);
  
  const baseClass = `${styles.ctaBtn} ${styles[type] || ''} ${isDisabled ? styles.disabled : ''}`;
  const icon = getIcon(type);

  // If disabled, render as a button (not <a>) with disabled attribute
  if (isDisabled) {
    return (
      <button className={baseClass} disabled type="button" aria-label={isPrivate ? 'Private Project' : children}>
        <span className={styles.icon}>{icon}</span>
        {isPrivate ? 'Private' : children}
      </button>
    );
  }

  // If we have an href, render as an <a>
  if (href) {
    return (
      <a
        className={baseClass}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${children}`}
        onClick={() => {
          analytics.trackProjectView(projectTitle || 'Project');
          analytics.trackCtaClick(`Project CTA - ${projectTitle || 'Project'} - ${children}`);
        }}
      >
        <span className={styles.icon}>{icon}</span>
        {children}
      </a>
    );
  }

  // Fallback for non-disabled buttons without href (like "Building")
  return (
    <button className={baseClass} type="button" aria-label={children}>
      <span className={styles.icon}>{icon}</span>
      {children}
    </button>
  );
};

export default CTAButton;
