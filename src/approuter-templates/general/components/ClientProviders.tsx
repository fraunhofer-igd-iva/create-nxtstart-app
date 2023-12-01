'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import PageLayout from '@/components/PageLayout'
import '@/app/globals.css'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'
import { Session } from 'next-auth'
import ThemeRegistry from '../app/ThemeRegistry'

export default function ClientProviders({
  session,
  children,
}: {
  session: Session | null | undefined
  children: React.ReactNode
}) {
  const [activeTheme, setActiveTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    // initialize theme on first page visit
    if (window !== undefined) {
      let newMode: 'light' | 'dark' = 'light'
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        newMode = 'dark'
      }
      const fromLocalStorage = window.localStorage.getItem('themeMode')
      if (fromLocalStorage && (fromLocalStorage === 'dark' || fromLocalStorage === 'light')) {
        newMode = fromLocalStorage
      }
      setActiveTheme(newMode)
    }
  }, [])

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeRegistry activeTheme={activeTheme}>
          {/* animated presence can be moved down around the Component to create per page transitions */}
          <AnimatePresence mode={'wait'} initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
            <PageLayout setActiveTheme={setActiveTheme}>{children}</PageLayout>
          </AnimatePresence>
        </ThemeRegistry>
      </Provider>
    </SessionProvider>
  )
}
