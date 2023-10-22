export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'nl', 'vn'],
} as const

export type Locale = (typeof i18n)['locales'][number]
