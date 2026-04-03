/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styles from './ResumeModal.module.css';

export default function ResumeModal({ isOpen, onClose }) {
  const resumeViewerSrc = '/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
  const resumeDirectSrc = '/resume.pdf';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return undefined;

    setLoading(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <button
        type="button"
        className={styles.backdropBtn}
        onClick={onClose}
        aria-label="Close resume viewer"
      />

      <div className={styles.modal}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Resume</h2>
          <div className={styles.actions}>
            <a href={resumeDirectSrc} target="_blank" rel="noopener noreferrer" className={styles.openBtn}>
              Open
            </a>
            <a href="/resume.pdf" download className={styles.actionBtn}>
              Download
            </a>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close resume viewer">
              Close
            </button>
          </div>
        </div>
        <div className={styles.viewerWrap}>
          {loading && (
            <div className={styles.spinnerWrap}>
              <div className={styles.spinner} aria-label="Loading resume" />
              <a href={resumeDirectSrc} target="_blank" rel="noopener noreferrer" className={styles.fallbackOpenBtn}>
                Open
              </a>
            </div>
          )}
          {isOpen && (
            <iframe
              src={resumeViewerSrc}
              title="Resume PDF"
              className={styles.viewer}
              style={loading ? { visibility: 'hidden' } : {}}
              onLoad={() => setLoading(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
