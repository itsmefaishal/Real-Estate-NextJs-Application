import * as React from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import NProgress from 'nprogress';
import { Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider>
      <Head> 
        <title>ReState</title>
      </Head>
      <Box maxWidth='1280px' m='auto' >
        <header className='navbar'>
          <Navbar />
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