import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import Layout from '../components/Layout';
import '../styles/globals.css';
import AppThemeProvider from '../components/AppThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { Inter } from 'next/font/google';
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, pageProps: { session, ...rest } }: AppProps) {

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <title>yarn-next</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='NextJS Webdevelopment Template' />
      </Head>
      <main className={inter.className}>
        <SessionProvider session={session}>
          <Provider store={store}>
            <AppThemeProvider>
              <Layout>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...rest} />
              </Layout>
            </AppThemeProvider>
          </Provider>
        </SessionProvider>
      </main>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
