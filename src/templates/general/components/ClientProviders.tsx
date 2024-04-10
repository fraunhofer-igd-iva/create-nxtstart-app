'use client'

import React from 'react'
<§redux§>import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store/store'</§redux§>
import PageLayout from '@/components/PageLayout'
import '@/app/globals.css'
<§nextAuth§>import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'</§nextAuth§>
<§animations§>import { AnimatePresence } from 'framer-motion'</§animations§>
import ThemeRegistry from '../app/ThemeRegistry'

export default function ClientProviders({
  <§nextAuth§>session,</§nextAuth§>
  children,
}: {
  <§nextAuth§>session: Session | null | undefined</§nextAuth§>
  children: React.ReactNode
}) {
  const [activeTheme, setActiveTheme] = React.useState<'light' | 'dark'>('light')

  <§redux§>const storeRef = React.useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  </§redux§>
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
    <§nextAuth§><SessionProvider session={session}></§nextAuth§>
      <§redux§><Provider store={storeRef.current}></§redux§>
        <ThemeRegistry activeTheme={activeTheme}>
          <§animations§>{/* animated presence can be moved down around the Component to create per page transitions */}
          <AnimatePresence mode={'wait'} initial={false} onExitComplete={() => window.scrollTo(0, 0)}></§animations§>
            <PageLayout setActiveTheme={setActiveTheme}>{children}</PageLayout>
          <§animations§></AnimatePresence></§animations§>
        </ThemeRegistry>
      <§redux§></Provider></§redux§>
    <§nextAuth§></SessionProvider></§nextAuth§>
  )
}
