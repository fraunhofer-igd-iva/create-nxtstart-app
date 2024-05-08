'use client'

import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { lightTheme, darkTheme } from './theme'

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry({
  children,
  activeTheme,
}: PropsWithChildren & { activeTheme: 'light' | 'dark' }) {
  return (
    <ThemeProvider theme={activeTheme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
