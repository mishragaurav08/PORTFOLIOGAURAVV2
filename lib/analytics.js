// Google Analytics utilities

// Initialize GA
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackWebVitals = ({ id, name, label, value }) => {
  event({
    action: name,
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js Metric',
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
  })
}

// Track outbound links
export const trackOutboundLink = (url, label) => {
  event({
    action: 'click',
    category: 'Outbound Link',
    label: label || url,
  })
}

// Track button clicks
export const trackButtonClick = (buttonName) => {
  event({
    action: 'click',
    category: 'Button',
    label: buttonName,
  })
}

export const trackCtaClick = (ctaName) => {
  event({
    action: 'click',
    category: 'CTA',
    label: ctaName,
  })
}

// Track form submissions
export const trackFormSubmit = (formName) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  })
}

// Track project views
export const trackProjectView = (projectName) => {
  event({
    action: 'open',
    category: 'Project',
    label: projectName,
  })
}

// Track downloads
export const trackDownload = (fileName) => {
  event({
    action: 'download',
    category: 'File',
    label: fileName,
  })
}

export const trackResumeDownload = () => {
  trackDownload('resume.pdf')
}

export const trackScrollDepth = (depthLabel) => {
  event({
    action: 'scroll_depth',
    category: 'Engagement',
    label: depthLabel,
  })
}
