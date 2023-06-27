import React from 'react';
// Load roboto font for entire application
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { lightTheme, darkTheme } from '../styles/theme';
import { selectTheme, setTheme } from '../store/slices/themeSlice';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

interface ComponentProps {
  children?: React.ReactNode
}

export default function AppThemeProvider(props: ComponentProps) {

  const mode = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()
  const [activeTheme, setActiveTheme] = React.useState(mode === 'dark' ? darkTheme : lightTheme)
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
      dispatch(setTheme(newMode))
      setMounted(true)
    }
  }, [dispatch])

  React.useEffect(() => {
    setActiveTheme(mode === 'dark' ? darkTheme : lightTheme)
  }, [mode])

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
        <ThemeProvider theme={activeTheme}>
          {props.children}
        </ThemeProvider>
      }
    </Box>
  )
}
