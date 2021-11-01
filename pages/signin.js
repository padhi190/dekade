import { Button, Center } from '@chakra-ui/react';
import { signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

export default function SignInPage() {
  const user = useContext(UserContext);
  const router = useRouter();
  if (user) {
    router.push('/courses');
  }
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
