import siteData from '../../site.json'

export type SystemSettings = {
  telegramLink: string
  microsoftTeamsLink: string
  redirectDomain: string
}

const fallback: SystemSettings = {
  telegramLink: '',
  microsoftTeamsLink: '',
  redirectDomain: '',
}

const systemSettings: SystemSettings = (siteData as any)?.data?.systemSettings ?? fallback

export const applyRedirectDomain = (href: string): string => {
  if (!href) return ''
  if (/^https?:\/\//i.test(href)) return href

  const base = systemSettings.redirectDomain?.replace(/\/+$/, '') ?? ''
  const path = href.startsWith('/') ? href.slice(1) : href

  if (!base) return `/${path}`
  return `${base}/${path}`
}

export default systemSettings
