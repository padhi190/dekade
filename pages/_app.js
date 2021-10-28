import { ChakraProvider } from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
  const user = useUserData();
  return (
    <ChakraProvider>
      <UserContext.Provider value={user}>
        <NavBar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
