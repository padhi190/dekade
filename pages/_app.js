import Head from 'next/head';
import {
  ChakraProvider,
  extendTheme,
  theme as chakraTheme,
} from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import '@fontsource/inter';

const config = {
  ...chakraTheme,
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
};

function MyApp({ Component, pageProps }) {
  const user = useUserData();
  return (
    <>
      <Head>
        <title>DEKADE</title>
        <meta name="description" content="DEKADE WO Class" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={extendTheme({ config })}>
        <UserContext.Provider value={user}>
          <NavBar />
          <Component {...pageProps} />
        </UserContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
