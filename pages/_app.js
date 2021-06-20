import React from 'react';
import '../styles/globals.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import theme from '../styles/theme';
import Head from 'next/head'
import Header from './components/header';

const themeHelper = extendTheme({ ...theme })
export const ThemeContext = React.createContext(themeHelper);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Paisa</title>
        <link rel="shortcut icon" href="/clockLogo4x.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider theme={themeHelper}>
        <ThemeContext.Provider value={themeHelper}>
          <Header h="75px"/>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </ChakraProvider>
    </>
  )
}

export default MyApp;
