import { Button, Center, Stack, Input, Image } from '@chakra-ui/react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

const SignInBox = () => {
  const user = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  if (user) {
    router.push('/profile');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    signInWithEmailAndPassword(auth, email, password);
  };
  return (
    <Center py={36} px={[2, 2, 4, 4]}>
      <Stack spacing={10} bgColor="gray.700" p={8} borderRadius="10px">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack spacing={4} align="center">
            <Image src="/logo.png" alt="logo" width={120} mb={4} />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              isRequired
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              isRequired
            />
            <Button type="submit" w="100%">
              Login
            </Button>
          </Stack>
        </form>
        <Button
          colorScheme="orange"
          onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
        >
          Sign In With Google
        </Button>
      </Stack>
    </Center>
  );
};

export default SignInBox;
