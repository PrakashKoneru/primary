import React, { useEffect } from 'react';
import '../styles/globals.css'
import { ChakraProvider, extendTheme, Container } from "@chakra-ui/react"
import theme from '../styles/theme';
import Head from 'next/head'
import Header from './components/header';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Login from './components/reUsable/login';

const themeHelper = extendTheme({ ...theme })
export const ThemeContext = React.createContext(themeHelper);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isLoggedIn = Cookies.get('pToken');
  // router.push('/loans');

  useEffect(() => {
    if(!isLoggedIn) {
      router.push('/')
    } else {
      router.push('/loans')
    }
  }, [])
  
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
          {!isLoggedIn ? <Login {...pageProps} /> : <Component {...pageProps} />}
        </ThemeContext.Provider>
      </ChakraProvider>
    </>
  )
}

export default MyApp;
