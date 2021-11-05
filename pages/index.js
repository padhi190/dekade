import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  Stack,
  Image,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
export default function Home() {
  return (
    <Box pt={16} px={['2', '2', '4', '4']}>
      <Flex flexDir={['column', 'column', 'column', 'row']} pt={16} mx={32}>
        <Box maxW={['100%', '100%', '100%', '50%']}>
          <Heading textTransform="uppercase" mb={16}>
            Build and Grow your Wedding Organizer Business
          </Heading>
          <Text fontSize="lg" mb={10}>
            Temukan rahasia menjadi Wedding Organizer profesional di DEKADE WO
            Class & Communication. Dengan belajar langsung dari{' '}
            <strong>Praktisi WO</strong> yang sudah 10 tahun lebih hilir mudik
            di dunia Wedding, anda akan mempercepat proses membangun dan
            mengembangkan WO anda.
          </Text>
          <Stack direction="row" spacing={4}>
            <Button
              colorScheme="red"
              color={useColorModeValue('gray.700', 'gray.100')}
              variant="outline"
              borderColor="red.700"
              borderWidth="medium"
              size="lg"
            >
              FREE LESSONS
            </Button>
            <Link href="/courses" passHref>
              <Button
                colorScheme="green"
                color={useColorModeValue('gray.700', 'gray.100')}
                variant="outline"
                borderColor="green.700"
                borderWidth="medium"
                size="lg"
              >
                ONLINE COURSE
              </Button>
            </Link>
          </Stack>
        </Box>
        <Flex px={16} w="100%" h="100%">
          <iframe></iframe>
        </Flex>
      </Flex>
    </Box>
  );
}
