import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

function MyApp({ Component, pageProps }) {
  const user = useUserData();
  return (
    <ChakraProvider theme={extendTheme({ config })}>
      <UserContext.Provider value={user}>
        <NavBar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
