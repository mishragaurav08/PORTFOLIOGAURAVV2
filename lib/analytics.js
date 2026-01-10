// Google Analytics utilities

// Initialize GA
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
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
    action: 'view',
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
