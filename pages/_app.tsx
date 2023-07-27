import { ThemeProvider, createTheme } from '@mui/material'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Theme } from '../styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: Theme.primary
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
