import React, { useEffect, useState } from 'react';
import styles from './ResumeModal.module.css';
import * as analytics from '../../lib/analytics';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Loader2 } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  const resumeViewerSrc = '/Gaurav.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH';
  const [loading, setLoading] = useState(true);
  const [previewError, setPreviewError] = useState(false);
  const modalRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);
  const lastFocusedRef = React.useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    lastFocusedRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            className={styles.backdropBtn}
            onClick={onClose}
            aria-label="Close resume viewer"
          />

          <motion.div
            ref={modalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className={styles.headerRow}>
              <div className={styles.titleGroup}>
                <h2 id="resume-modal-title" className={styles.title}>Resume</h2>
              </div>
              
              <div className={styles.actions}>
                <a
                  href="/Gaurav.pdf"
                  download="Gaurav_Mishra_Resume.pdf"
                  className={styles.iconBtn}
                  onClick={() => analytics.trackResumeDownload()}
                  title="Download PDF"
                >
                  <Download size={18} />
                  <span className={styles.btnText}>Download</span>
                </a>

                <button
                  ref={closeBtnRef}
                  type="button"
                  className={styles.closeBtn}
                  onClick={onClose}
                  aria-label="Close resume viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className={styles.viewerWrap}>
              {loading && !previewError && (
                <div className={styles.spinnerWrap}>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Loader2 className={styles.spinnerIcon} size={32} />
                  </motion.div>
                  <p className={styles.loadingText}>Rendering Document...</p>
                </div>
              )}
              
              {previewError ? (
                <div className={styles.previewFallback} role="status" aria-live="polite">
                  <div className={styles.errorIconWrap}>
                    <ExternalLink size={48} />
                  </div>
                  <p className={styles.fallbackTitle}>Preview unavailable</p>
                  <p className={styles.fallbackText}>Your browser doesn't support inline PDF previews.</p>
                  <div className={styles.fallbackActions}>
                    <a
                      href="/Gaurav.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.primaryActionBtn}
                      onClick={() => {
                        analytics.trackResumeDownload()
                        analytics.trackCtaClick('Open Resume In New Tab')
                      }}
                    >
                      <ExternalLink size={18} />
                      Open in New Tab
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  id="resume-iframe"
                  src={resumeViewerSrc}
                  title="Resume PDF"
                  className={styles.viewer}
                  style={loading ? { opacity: 0 } : { opacity: 1 }}
                  onLoad={() => {
                    setPreviewError(false)
                    setLoading(false)
                  }}
                  onError={() => {
                    setPreviewError(true)
                    setLoading(false)
                  }}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
