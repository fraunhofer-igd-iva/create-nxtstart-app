import { createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors'

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'dark',
        primary: {
          main: green.A700,
        },
        secondary: {
          main: '#ff6666',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: green.A700,
        },
        secondary: {
          main: '#ff6666',
        },
      },
    }
  }
})
