'use client'

import { I18nextProvider } from 'react-i18next'
import { useEffect, useState } from 'react'
import initTranslations from '@/app/i18n'
import { i18n as i18nType } from 'i18next'

interface TranslationsProviderProps {
  children: React.ReactNode
  locale: string
  namespaces: string | readonly string[] | undefined
}

let i18n: i18nType | null = null

export default function TranslationProvider({ children, locale, namespaces }: TranslationsProviderProps) {
  const [instance, setInstance] = useState(i18n)

  useEffect(() => {
    const init = async () => {
      if (!i18n) {
        const newInstance = await initTranslations(locale, namespaces)
        i18n = newInstance
        setInstance(newInstance)
      } else {
        if (i18n.language !== locale) {
          i18n.changeLanguage(locale)
        }
      }
    }

    init()
  }, [locale, namespaces])

  if (!instance) {
    return null
  }

  return (
    <I18nextProvider i18n={instance} defaultNS={namespaces && namespaces[0]}>
      {children}
    </I18nextProvider>
  )
}
