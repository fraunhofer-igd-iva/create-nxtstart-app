'use client'

import React from 'react'
<§redux§>import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store/store'</§redux§>
import PageLayout from '@/components/PageLayout'
import '@/app/globals.css'
<§nextAuth§>import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'</§nextAuth§>
<§animations§>import { AnimatePresence } from 'framer-motion'</§animations§>
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/app/theme'

export default function ClientProviders({
  <§nextAuth§>session,</§nextAuth§>
  children,
}: {
  <§nextAuth§>session: Session | null | undefined</§nextAuth§>
  children: React.ReactNode
}) {
  <§redux§>const storeRef = React.useRef<AppStore>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }</§redux§>

  return (
    <§nextAuth§><SessionProvider session={session}></§nextAuth§>
      <§redux§><Provider store={storeRef.current}></§redux§>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <§animations§><AnimatePresence mode={'wait'}></§animations§>
            <PageLayout>{children}</PageLayout>
          <§animations§></AnimatePresence></§animations§>
        </ThemeProvider>
      <§redux§></Provider></§redux§>
    <§nextAuth§></SessionProvider></§nextAuth§>
  )
}
