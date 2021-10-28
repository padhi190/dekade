import { Button } from '@chakra-ui/button';
import { signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

export default function SignInPage() {
  const user = useContext(UserContext);

  return (
    <>
      {!user ? (
        <Button
          colorScheme="orange"
          onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
        >
          Sign In With Google
        </Button>
      ) : null}
    </>
  );
}
