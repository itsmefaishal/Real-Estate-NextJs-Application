import * as React from 'react';
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'
import { Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider>
      <Head>
        <title>Real Estate</title>
      </Head>
      <Box maxWidth='1280px' m='auto' >
        <header>
          Navbar
        </header>
        <main>
          <Component {...pageProps} />
        </main>
        <footer>
          Footer
        </footer>
      </Box>
    </ChakraProvider>      
  );
}

export default MyApp;