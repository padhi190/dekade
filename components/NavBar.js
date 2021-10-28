import {
  Box,
  Flex,
  Stack,
  Button,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Image,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Collapse,
} from '@chakra-ui/react';

import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { signOut } from '@firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

function SignInButton() {
  const user = useContext(UserContext);
  const render = !user ? (
    <Link href="/signin" passHref>
      <Button colorScheme="orange">Sign In</Button>
    </Link>
  ) : (
    <Menu>
      <MenuButton>
        <Avatar src={user.photoUrl} />
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={() => signOut(auth)}>SignOut</MenuItem>
      </MenuList>
    </Menu>
  );

  return render;
}
const darkBg = {
  light: 'gray.100',
  dark: 'gray.900',
};

function MobileSignIn({ onClick }) {
  const user = useContext(UserContext);
  const { colorMode } = useColorMode();
  const render = !user ? (
    <Link href="/signin" passHref>
      <Box as={Button} w="100vw" bgColor={darkBg[colorMode]} onClick={onClick}>
        Sign In
      </Box>
    </Link>
  ) : null;

  return render;
}
export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const hideOnMobile = ['none', 'none', 'flex', 'flex'];
  const showOnMobile = ['flex', 'flex', 'none', 'none'];

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={[2, 2, 20]}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size="lg"
          icon={<HamburgerIcon />}
          display={showOnMobile}
          onClick={onToggle}
        />
        <Link href="/" passHref>
          <Box as={Button} variant={'link'} display={hideOnMobile}>
            <Image src="/logo.svg" alt="logo" height={120} />
          </Box>
        </Link>

        <Box display={hideOnMobile}>
          <Link href="/signin" passHref>
            <Box as={Button}>Home</Box>
          </Link>
        </Box>

        <Flex alignItems={'center'} justifyContent="center">
          <Stack direction={'row'} spacing={7} align="center">
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <SignInButton />
          </Stack>
        </Flex>
      </Flex>

      <Collapse in={isOpen}>
        <Flex
          w="100vw"
          bgColor={darkBg[colorMode]}
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          flexDir="column"
        >
          <IconButton
            size="lg"
            icon={<CloseIcon />}
            alignSelf="flex-start"
            onClick={onClose}
            bgColor={darkBg[colorMode]}
          />
          <Flex
            flexDir="column"
            justifyContent="flex-start"
            align="center"
            bgColor={darkBg[colorMode]}
          >
            <Link href="/" passHref>
              <Box
                as={Button}
                w="100vw"
                bgColor={darkBg[colorMode]}
                onClick={onClose}
              >
                Home
              </Box>
            </Link>
            <MobileSignIn onClick={onClose} />
          </Flex>
        </Flex>
      </Collapse>
    </Box>
  );
}
