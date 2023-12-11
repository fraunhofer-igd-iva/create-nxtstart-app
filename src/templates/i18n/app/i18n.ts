import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from '@/i18nConfig'

export default async function initTranslations(locale: string, namespaces: string | readonly string[] | undefined) {
  const i18nInstance = createInstance()

  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`@/locales/${language}/${namespace}.json`)))
    .init({
      lng: locale,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      defaultNS: namespaces && Array.isArray(namespaces) ? namespaces[0] : namespaces,
      fallbackNS: namespaces && Array.isArray(namespaces) ? namespaces[0] : namespaces,
      ns: namespaces,
      preload: typeof window === 'undefined' ? i18nConfig.locales : [],
    })

  return i18nInstance
}
