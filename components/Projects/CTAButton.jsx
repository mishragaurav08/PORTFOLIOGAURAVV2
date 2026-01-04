import React from 'react';
import { Globe, Figma, Github, Loader2 } from 'lucide-react';
import styles from './Projects.module.css';

const ICONS = {
  demo: Globe,
  design: Figma,
  github: Github,
  inprogress: Loader2,
};

function getIcon(type) {
  const IconComponent = ICONS[type];
  if (!IconComponent) {
    return null;
  }

  const iconProps = { size: 18 };
  if (type === 'inprogress') {
    iconProps.className = styles.cogSpin;
  }

  return <IconComponent {...iconProps} />;
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