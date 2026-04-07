import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCog } from '@fortawesome/free-solid-svg-icons';
import { faFigma, faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from './Projects.module.css';

const ICONS = {
  demo: faLink,
  design: faFigma,
  github: faGithub,
  inprogress: faCog,
};

function getIcon(type) {
  const icon = ICONS[type];
  if (!icon) return null;

  // For consistency with existing CSS, keep the wrapper span's .icon styles
  // and apply the spinning class for 'inprogress'.
  const className = type === 'inprogress' ? styles.cogSpin : undefined;
  return <FontAwesomeIcon icon={icon} className={className} />;
}

const CTAButton = ({ type, href, children }) => {
  const baseClass = `${styles.ctaBtn} ${styles[type]}`;
  const isDisabled = type === 'inprogress' || (type !== 'inprogress' && !href);
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
