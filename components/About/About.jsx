import React from 'react'
import styles from './About.module.css'
export default function About() {
  return (
    <section className={styles.wrapper} id="about">
      <div className={styles.headerRow}>
        <h2 className={styles.header}>ABOUT ME</h2>
        <div className={styles.ruleWrapper} aria-hidden>
          <div className={styles.rule} />
          <div className={styles.ruleAccent} />
        </div>
      </div>

      <div className={styles.card}>
        <p className={styles.copy}>
          <strong>Product-focused UX/UI designer and frontend developer</strong>, currently studying Computer Science (Cyber Security) at SRMIST. Co-founder of <strong>Studique</strong>, a campus platform used by <strong>15,000+ students</strong>, where I work across design, frontend, and product decisions. Previously interned at <strong>Samsung PRISM '25</strong> and currently part of the <strong>iOS Developer Program by Apple and Infosys.</strong>
        </p>

        <div className={styles.actions}>
              <a className={styles.resume} href="https://drive.google.com/file/d/1owe5QFBcN31WJJM4txaOtS4iFAbXHYKW/preview" aria-label="Open resume">
                    <span className={styles.resumeIcon} aria-hidden>
                      <i className="fas fa-file-pdf" aria-hidden></i>
                    </span>
                    <span>View Resume</span>
                  </a>
        </div>
      </div>

      {/* Skills and social links section removed */}
    </section>
  )
}
