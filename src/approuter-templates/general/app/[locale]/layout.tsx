import React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import ClientProviders from '../../components/ClientProviders'
import i18nConfig from '@/i18nConfig'
import { dir } from 'i18next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import initTranslations from '@/app/i18n'
import TranslationProvider from '@/components/TranslationProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nxtstart',
  description:
    'Nxtstart is an easy to use, interactive CLI tool to bootstrap your next web-based project. The template is aimed at students to get an easy access to web development with example implementations. It is also useful for experts to speed up prototyping.',
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: {
    locale: string
  }
}) {
  const session = await getServerSession(authOptions)
  const { options } = await initTranslations(locale, ['common'])

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>
        <TranslationProvider namespaces={options.ns} locale={locale}>
          <ClientProviders session={session}>{children}</ClientProviders>
        </TranslationProvider>
      </body>
    </html>
  )
}
