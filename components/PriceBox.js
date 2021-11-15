import {
  Center,
  Box,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

function PriceBox({ course, walink }) {
  const bgColor = useColorModeValue('gray.300', 'gray.700');
  const bgColor2 = useColorModeValue('gray.200', 'gray.500');

  return (
    <div>
      <Box
        mb={4}
        shadow="base"
        borderWidth="1px"
        borderColor={bgColor}
        borderRadius={'xl'}
        maxW="330px"
      >
        <Box position="relative">
          <Box
            position="absolute"
            top="-16px"
            left="50%"
            style={{ transform: 'translate(-50%)' }}
          >
            <Text
              textTransform="uppercase"
              bg={'red.300'}
              px={3}
              py={1}
              color={'gray.900'}
              fontSize="sm"
              fontWeight="600"
              rounded="xl"
            >
              PRO ONLY
            </Text>
          </Box>
          <Box py={4} px={12} bgColor="{bgColor2}">
            <Text fontWeight="500" fontSize="lg" textAlign="center">
              {course?.title}
            </Text>
          </Box>
          <VStack bg={bgColor} py={4} borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Full online
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Akses seumur hidup
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Update materi gratis
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Diskon untuk kelas offline
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Link href={walink} passHref>
                <Button
                  w="full"
                  colorScheme="green"
                  textTransform="uppercase"
                  leftIcon={<FaWhatsapp />}
                >
                  Daftar via WA
                </Button>
              </Link>
            </Box>
          </VStack>
        </Box>
      </Box>
    </div>
  );
}

export default PriceBox;
