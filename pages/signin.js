import { Button, Center } from '@chakra-ui/react';
import { signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

export default function SignInPage() {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <Center py={40}>
      {!user ? (
        <Button
          colorScheme="orange"
          onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
        >
          Sign In With Google
        </Button>
      ) : null}
    </Center>
  );
}
