import React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
<§redux§>import StateProvider from '@/components/StateProvider'</§redux§>

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nxtstart',
  description:
    'Nxtstart is an easy to use, interactive CLI tool to bootstrap your next web-based project. The template is aimed at students to get an easy access to web development with example implementations. It is also useful for experts to speed up prototyping.',
}

// root layout applied to all pages, more specific layouts can be defined deeper in the folder structure for subpaths of the app
export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html>
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
          <§redux§><StateProvider></§redux§>{children}<§redux§></StateProvider></§redux§>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
