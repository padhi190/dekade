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
  Slide,
  Collapse,
} from '@chakra-ui/react';

import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { signOut } from '@firebase/auth';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

function SignInButton() {
  const { user } = useContext(UserContext);
  const render = !user ? (
    <Link href="/signin" passHref>
      <Button colorScheme="orange">Sign In</Button>
    </Link>
  ) : (
    <Menu>
      <MenuButton>
        <Avatar src={user.photoUrl} name={user.name} />
      </MenuButton>
      <MenuList>
        <Link href="/profile" passHref>
          <MenuItem>Profile</MenuItem>
        </Link>
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
      <Box
        as={Button}
        w="100vw"
        bgColor={darkBg[colorMode]}
        onClick={onClick}
        h={20}
      >
        Sign In
      </Box>
    </Link>
  ) : null;

  return render;
}
export default function NavBar() {
  const { user } = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const hideOnMobile = ['none', 'none', 'flex', 'flex'];
  const showOnMobile = ['flex', 'flex', 'none', 'none'];
  const router = useRouter();
  const hideNav = router.pathname === '/andhan';
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={[2, 2, 4, 4]}
      position="fixed"
      w="100%"
      zIndex={10}
      mb={6}
      boxShadow="md"
      display={hideNav ? 'none' : 'block'}
    >
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        mx="auto"
      >
        <IconButton
          size="lg"
          icon={<HamburgerIcon />}
          display={showOnMobile}
          onClick={onToggle}
        />
        <Link href="/" passHref>
          <Box as={Button} variant={'link'} display={hideOnMobile}>
            <Image src="/logo.png" alt="logo" width={120} />
          </Box>
        </Link>

        <Stack display={hideOnMobile} direction="row" spacing={4}>
          <Link href="/" passHref>
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/courses" passHref>
            <Button variant="ghost">Courses</Button>
          </Link>
          {user?.admin && (
            <Link href="/admin" passHref>
              <Button variant="ghost">Admin</Button>
            </Link>
          )}
        </Stack>

        <Flex alignItems={'center'} justifyContent="center">
          <Stack direction={'row'} spacing={7} align="center">
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <SignInButton />
          </Stack>
        </Flex>
      </Flex>

      <Slide direction="left" in={isOpen}>
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
            justifyContent="space-between"
            align="center"
            bgColor={darkBg[colorMode]}
          >
            <Link href="/" passHref>
              <Box
                as={Button}
                w="100vw"
                bgColor={darkBg[colorMode]}
                onClick={onClose}
                h={20}
              >
                Home
              </Box>
            </Link>
            <Link href="/courses" passHref>
              <Box
                as={Button}
                w="100vw"
                bgColor={darkBg[colorMode]}
                onClick={onClose}
                h={20}
              >
                Courses
              </Box>
            </Link>
            {user?.admin && (
              <Link href="/admin" passHref>
                <Box
                  as={Button}
                  w="100vw"
                  bgColor={darkBg[colorMode]}
                  onClick={onClose}
                  h={20}
                >
                  Admin
                </Box>
              </Link>
            )}
            <MobileSignIn onClick={onClose} />
          </Flex>
        </Flex>
      </Slide>
    </Box>
  );
}
