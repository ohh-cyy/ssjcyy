export type PageId = 'home' | 'design' | 'timeline' | 'scene'

export const pages: { id: PageId; label: string; en: string }[] = [
  { id: 'home', label: '首页', en: 'Home' },
  { id: 'design', label: '衍生设计', en: 'Design' },
  { id: 'timeline', label: '时间长廊', en: 'Timeline' },
  { id: 'scene', label: '场景适配', en: 'Scene' },
]

export function parseHash(): PageId {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (raw === 'design' || raw === 'timeline' || raw === 'scene') return raw
  return 'home'
}

export function setHash(page: PageId) {
  window.location.hash = page === 'home' ? '#/' : `#/${page}`
}
