import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5', // indigo
    },
    secondary: {
      main: '#f97316', // orange
    },
    background: {
      default: '#f3f4f6',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow:
            '0 18px 45px rgba(15, 23, 42, 0.16), 0 8px 18px rgba(15, 23, 42, 0.1)',
        },
      },
    },
  },
})

export default theme

