import React from 'react'
import i18nConfig from '@/i18nConfig'
import initTranslations from '@/app/i18n'
import TranslationProvider from '@/components/TranslationProvider'
import { PageProps } from '@/util/types'
import ClientProviders from '@/components/ClientProviders'

// used to access locale in the layout
export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

// root layout applied to all pages, more specific layouts can be defined deeper in the folder structure for subpaths of the app
export default async function RootLayout({ children, params }: { children: React.ReactNode; params: PageProps }) {
  const { locale } = await params
  const { options } = await initTranslations(locale, ['common'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <ClientProviders>{children}</ClientProviders>
    </TranslationProvider>
  )
}
