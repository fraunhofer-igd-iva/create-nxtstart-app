import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
<%redux%>import { Provider } from 'react-redux'
import { store } from '@/store/store'</%redux%>
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@/styles/createEmotionCache'
import Layout from '@/components/Layout'
import '@/styles/globals.css'
import AppThemeProvider from '@/components/AppThemeProvider'
<%nextAuth%>import { SessionProvider } from 'next-auth/react'</%nextAuth%>
import { appWithTranslation<%animations%>, I18nContext</%animations%> } from 'next-i18next'
import { Inter } from 'next/font/google'
<%animations%>import { AnimatePresence } from 'framer-motion'</%animations%>

// if loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

// client-side cache, shared for the whole session of the user in the browser
const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, pageProps: { session, ...rest } }: AppProps) {
  <%animations%>const preservedI18nContext = React.useContext(I18nContext)</%animations%>

  const [activeTheme, setActiveTheme] = React.useState<'light' | 'dark'>('light')

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <title>Webstart 5.0</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='NextJS Webdevelopment Template' />
      </Head>
      <main className={inter.className}>
        <%nextAuth%><SessionProvider session={session}></%nextAuth%>
          <%redux%><Provider store={store}></%redux%>
            <AppThemeProvider activeTheme={activeTheme} setActiveTheme={setActiveTheme}>
            <%animations%>{/* animated presence can be moved down around the Component to create per page transitions */}
              <AnimatePresence mode={'wait'} initial={false} onExitComplete={() => window.scrollTo(0, 0)}></%animations%>
                <Layout setActiveTheme={setActiveTheme}>
                  <%animations%><I18nContext.Provider value={preservedI18nContext}></%animations%>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...rest} />
                  <%animations%></I18nContext.Provider></%animations%>
                </Layout>
              <%animations%></AnimatePresence></%animations%>
            </AppThemeProvider>
          <%redux%></Provider></%redux%>
        <%nextAuth%></SessionProvider></%nextAuth%>
      </main>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
