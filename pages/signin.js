import { Flex } from '@chakra-ui/react';
import SignInBox from '../components/SignInBox';

export default function SignInPage() {
  return (
    <Flex justifyContent="center" alignItems="center" h="100vh">
      <SignInBox />
    </Flex>
  );
}
