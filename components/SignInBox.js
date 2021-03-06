import {
  Button,
  Center,
  Stack,
  Input,
  Image,
  useToast,
} from '@chakra-ui/react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

const addToast = (toast, type) => {
  const configError = {
    title: 'Login gagal',
    description: 'Cek kembali email dan password anda',
    status: 'error',
  };
  const configSuccess = {
    title: 'Login berhasil',
    status: 'success',
  };
  const config = type === 'error' ? configError : configSuccess;

  toast({
    duration: 3000,
    isClosable: true,
    position: 'top',
    ...config,
  });
};

const SignInBox = () => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  if (user) {
    router.push('/profile');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      addToast(toast, 'success');
    } catch (error) {
      addToast(toast, 'error');
    }
  };
  return (
    <Center px={5}>
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
              color="white"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              isRequired
              color="white"
            />
            <Button type="submit" w="100%">
              Login
            </Button>
          </Stack>
        </form>
        <Button
          colorScheme="orange"
          onClick={async () => {
            try {
              const provider = new GoogleAuthProvider();
              provider.setCustomParameters({
                prompt: 'select_account',
              });
              await signInWithPopup(auth, provider);
              addToast(toast, 'success');
            } catch (error) {
              addToast(toast, 'error');
            }
          }}
        >
          Sign In With Google
        </Button>
      </Stack>
    </Center>
  );
};

export default SignInBox;
