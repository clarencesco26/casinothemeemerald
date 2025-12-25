import siteData from '../../site.json'
import { applyRedirectDomain } from '@/config/systemSettings'

export type PopupItem = {
  id: number | string
  imageUrl: string
  href: string
  isPinned?: boolean
}

export type PopupSets = {
  first: PopupItem[]
  bigSingle: PopupItem[]
  second: PopupItem[]
}

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copy[i]
    copy[i] = copy[j] as T
    copy[j] = temp as T
  }
  return copy
}

const normalizeItems = (items: any[] = []): PopupItem[] =>
  items
    .filter(Boolean)
    .map((item, idx) => ({
      id: item.id ?? idx,
      imageUrl: item.imageUrl ?? item.img ?? '',
      href: applyRedirectDomain(item.href ?? ''),
      isPinned: Boolean(item.isPinned),
    }))
    .filter((item) => item.imageUrl)

const orderPinnedThenRandom = (items: PopupItem[]): PopupItem[] => {
  const pinned = items.filter((i) => i.isPinned)
  const nonPinned = items.filter((i) => !i.isPinned)
  return [...pinned, ...shuffle(nonPinned)]
}

export const getPopupSets = (): PopupSets => {
  const raw = (siteData as any)?.data?.popups ?? {}
  const first = normalizeItems(raw.first)
  const bigSingle = normalizeItems(raw.bigSingle)
  const second = normalizeItems(raw.second)

  return {
    first: orderPinnedThenRandom(first).slice(0, 4),
    bigSingle: orderPinnedThenRandom(bigSingle),
    second: orderPinnedThenRandom(second).slice(0, 4),
  }
}

export const pickRandom = (items: PopupItem[]): PopupItem | null => {
  if (!items?.length) return null
  const idx = Math.floor(Math.random() * items.length)
  return items[idx] ?? null
}
