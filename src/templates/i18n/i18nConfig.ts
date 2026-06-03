const i18nConfig = {
  locales: ['en', 'de'],
  defaultLocale: 'en',
  prefixDefault: true,
  // prevent i18n router middleware from replacing cookie falsely after language switch
  serverSetCookie: 'never',
} as const

export default i18nConfig
