import React from 'react';
import { lightTheme, darkTheme } from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

interface ComponentProps {
  activeTheme: 'light' | 'dark',
  setActiveTheme: (newMode: 'light' | 'dark') => void,
  children?: React.ReactNode
}

export default function AppThemeProvider(props: ComponentProps) {

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (window !== undefined) {
      let newMode: 'light' | 'dark' = 'light'
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        newMode = 'dark'
      }
      const fromLocalStorage = window.localStorage.getItem('themeMode')
      if (fromLocalStorage && (fromLocalStorage === 'dark' || fromLocalStorage === 'light')) {
        newMode = fromLocalStorage
      }
      setMounted(true)
      props.setActiveTheme(newMode)
    }
  })

  return (
    <Box>
      {
        // removes rendering the application with the (possibly) wrong theme on first render
        // delays displaying until app is mounted
        !mounted &&
        <Box sx={{ visibility: 'hidden' }}>{props.children}</Box>
      }
      {
        mounted &&
        <ThemeProvider theme={props.activeTheme === 'light' ? lightTheme : darkTheme}>
          {props.children}
        </ThemeProvider>
      }
    </Box>
  )
}
