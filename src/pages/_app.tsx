import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries';
import { lightTheme, darkTheme } from '../themes';
import '../styles/globals.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}

/*
En esta page se incluye la condiguración inicial necesaria para hacer funcionar a Material UI.
Es necesario el ThemeProvider y CssBaseLine
*/
