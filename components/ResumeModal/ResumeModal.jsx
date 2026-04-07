/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styles from './ResumeModal.module.css';

export default function ResumeModal({ isOpen, onClose }) {
  const resumeViewerSrc = '/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
  const [loading, setLoading] = useState(true);
  const modalRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);
  const lastFocusedRef = React.useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    setLoading(true);
    lastFocusedRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = modalRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable || focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === 'function') {
        lastFocusedRef.current.focus();
      }
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

      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        <div className={styles.headerRow}>
          <h2 id="resume-modal-title" className={styles.title}>Resume</h2>
          <div className={styles.actions}>
            <a href="/resume.pdf" download className={styles.actionBtn}>
              Download
            </a>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close resume viewer"
            >
              Close
            </button>
          </div>
        </div>
        <div className={styles.viewerWrap}>
          {loading && (
            <div className={styles.spinnerWrap}>
              <div className={styles.spinner} aria-label="Loading resume" />
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
