import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useColorMode,
  List,
  ListItem,
  ListIcon,
  Grid,
} from '@chakra-ui/react';

import Link from 'next/link';
import {
  IoIosMic,
  IoLogoInstagram,
  IoIosCheckmarkCircleOutline,
  IoLogoChrome,
} from 'react-icons/io';
import { FaUserGraduate } from 'react-icons/fa';

export default function Andhan() {
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode !== 'light') {
    toggleColorMode();
  }
  const jadwalmc =
    'https://api.whatsapp.com/send?phone=6281333308856&text=Halo,%20saya%20mau%20tanya%20jadwal%20MC%20untuk%0A%0ANama:%0AJenis%20Acara:%0ATanggal:%0ATempat%20Acara:%0AJam:%0A%0AApakah%20Teh%20Andhan%20available?';
  return (
    <Grid placeItems="center" h="95vh" my={'auto'}>
      <Box
        maxW={'350px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'150px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
          }
          alt="background image"
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={'andhan.jpg'}
            alt={'Andhan'}
            border="4px solid white"
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              Andhan Indah
            </Heading>
          </Stack>

          <List spacing={2} mb={6}>
            <ListItem fontSize="sm">
              <ListIcon as={IoIosCheckmarkCircleOutline} color="green.500" />
              Professional MC
            </ListItem>
            <ListItem fontSize="sm">
              <ListIcon as={IoIosCheckmarkCircleOutline} color="green.500" />
              Founder DEKADE WO Coaching Class
            </ListItem>
            <ListItem fontSize="sm">
              <ListIcon as={IoIosCheckmarkCircleOutline} color="green.500" />
              Wakil Sekretaris Wilayah HIPAPI Jawa Barat
            </ListItem>
          </List>

          <Stack spacing={4}>
            <Link href={jadwalmc} passHref>
              <Button
                w={'full'}
                colorScheme="green"
                rounded={'md'}
                variant="outline"
                leftIcon={<IoIosMic />}
              >
                Tanya Jadwal MC
              </Button>
            </Link>
            <Link prefetch={true} href="/courses" passHref>
              <Button
                w={'full'}
                colorScheme="green"
                rounded={'md'}
                variant="outline"
                leftIcon={<FaUserGraduate />}
              >
                Online Courses
              </Button>
            </Link>
            <Link href="https://www.instagram.com/dekadewoclass/" passHref>
              <Button
                w={'full'}
                colorScheme="green"
                rounded={'md'}
                variant="outline"
                leftIcon={<IoLogoInstagram />}
              >
                Instagram DEKADE
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button
                w={'full'}
                colorScheme="green"
                rounded={'md'}
                variant="outline"
                leftIcon={<IoLogoChrome />}
              >
                Website DEKADE
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
}
