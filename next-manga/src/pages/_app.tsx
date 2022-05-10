import { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client'
import { Provider as AuthProvider } from 'next-auth/client'

import NextNprogress from 'nextjs-progressbar'
import GlobalStyles from 'styles/global'
import dark from 'styles/dark'
import { useApollo } from '../utils/apollo'
import { FavoriteProvider } from 'hooks/use-favorite'
import { ReaderProvider } from 'hooks/use-reader'
import { WishlistProvider } from 'hooks/use-wish'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)
  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <ReaderProvider>
          <FavoriteProvider>
            <WishlistProvider>
              <ThemeProvider theme={dark}>
                <Head>
                  <title>Mangas Home</title>
                  <link rel="shortcut icon" href="/favicon.png" />
                  <link rel="apple-touch-icon" href="/favicon.png" />
                  <link rel="manifest" href="/manifest.json" />
                  <meta name="theme-color" content="#06092B" />
                  <meta
                    name="description"
                    content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
                  />
                </Head>
                <GlobalStyles />
                <NextNprogress
                  color={dark.colors.lightText}
                  startPosition={0.3}
                  stopDelayMs={200}
                  height={3}
                />
                <Component {...pageProps} />
              </ThemeProvider>
            </WishlistProvider>
          </FavoriteProvider>
        </ReaderProvider>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
