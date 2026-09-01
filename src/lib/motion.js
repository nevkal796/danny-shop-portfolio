export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const INTERIOR_PATHS = [
  '/projects',
  '/skills',
  '/experience',
  '/education',
  '/about',
  '/contact',
]

export const sectionFromPath = (pathname) =>
  INTERIOR_PATHS.includes(pathname) ? pathname.slice(1) : null
