'use client'

import React from 'react'
<§redux§>import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store/store'</§redux§>
import PageLayout from '@/components/PageLayout'
import '@/app/globals.css'
<§animations§>import { AnimatePresence } from 'framer-motion'</§animations§>
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/app/theme'

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  <§redux§>const [store] = React.useState<AppStore>(() => makeStore())</§redux§>

  return (
    <§redux§><Provider store={store}></§redux§>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <§animations§><AnimatePresence mode={'wait'}></§animations§>
          <PageLayout>{children}</PageLayout>
        <§animations§></AnimatePresence></§animations§>
      </ThemeProvider>
    <§redux§></Provider></§redux§>
  )
}
