import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../themes';
import { UIProvider } from '../context/ui';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  )
}

/*
En esta page se incluye la condiguración inicial necesaria para hacer funcionar a Material UI.
Es necesario el ThemeProvider y CssBaseLine
*/
