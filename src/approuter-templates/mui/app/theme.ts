import { createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: green.A700,
    },
    secondary: {
      main: '#ff6666',
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: green.A700,
    },
    secondary: {
      main: '#ff6666',
    },
  },
})
