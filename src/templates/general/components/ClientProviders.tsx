'use client'

import React from 'react'
import PageLayout from '@/components/PageLayout'
<§animations§>import { AnimatePresence } from 'framer-motion'</§animations§>
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/app/theme'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <§animations§><AnimatePresence mode={'wait'}></§animations§>
        <PageLayout>{children}</PageLayout>
      <§animations§></AnimatePresence></§animations§>
    </ThemeProvider>
  )
}
