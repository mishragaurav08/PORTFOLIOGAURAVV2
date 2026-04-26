export function getPrimaryScrollElement() {
  if (typeof document === 'undefined') return null

  const appRoot = document.getElementById('__next')
  const docScroller = document.scrollingElement || document.documentElement

  if (!appRoot) return docScroller

  const appMax = appRoot.scrollHeight - appRoot.clientHeight
  const docViewport = typeof window !== 'undefined' ? window.innerHeight : docScroller.clientHeight
  const docMax = docScroller.scrollHeight - docViewport

  if (appMax <= 0 && docMax > 0) return docScroller
  if (docMax <= 0 && appMax > 0) return appRoot
  return appMax >= docMax ? appRoot : docScroller
}

export function getScrollMetrics() {
  const element = getPrimaryScrollElement()
  if (!element) {
    return {
      element: null,
      isDocumentScroller: true,
      scrollTop: 0,
      maxScroll: 0,
      ratio: 0,
    }
  }

  const isDocumentScroller =
    element === document.documentElement ||
    element === document.body ||
    element === document.scrollingElement

  const viewportHeight = isDocumentScroller
    ? window.innerHeight
    : element.clientHeight
  const scrollTop = isDocumentScroller
    ? window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
    : element.scrollTop
  const maxScroll = Math.max(0, element.scrollHeight - viewportHeight)
  const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0

  return {
    element,
    isDocumentScroller,
    scrollTop,
    maxScroll,
    ratio,
  }
}
