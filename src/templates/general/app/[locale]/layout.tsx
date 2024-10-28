import React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import ClientProviders from '../../components/ClientProviders'
import i18nConfig from '@/i18nConfig'
<§nextAuth§>import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'</§nextAuth§>
import initTranslations from '@/app/i18n'
import TranslationProvider from '@/components/TranslationProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { PageProps } from '@/util/types'

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
  params,
}: {
  children: React.ReactNode
  params: PageProps
}) {
  const { locale } = await params
  <§nextAuth§>const session = await getServerSession(authOptions)</§nextAuth§>
  const { options } = await initTranslations(locale, ['common'])

  return (
    <html lang={locale}>
      <§pwa§><head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
        <link rel="manifest" href="/img/site.webmanifest" />
        <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#00c853" />
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <meta name="msapplication-TileColor" content="#00c853" />
        <meta name="msapplication-config" content="/img/browserconfig.xml" />
        <meta name="theme-color" content="#000000" />
      </head></§pwa§>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <TranslationProvider namespaces={options.ns} locale={locale}>
            <ClientProviders <§nextAuth§>session={session}</§nextAuth§>>{children}</ClientProviders>
          </TranslationProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
