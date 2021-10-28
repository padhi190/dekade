import {
  Box,
  Stack,
  Image,
  Text,
  Heading,
  Center,
  Button,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';

export default function Card() {
  const propMock = {
    title: 'Boost your Conversion Rate',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt',
    imgUrl:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    smallText: 'best selling',
  };
  const { title, description, imgUrl, smallText } = propMock;
  return (
    <Box
      maxW={'400px'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded="10px"
      overflow="hidden"
      boxShadow="dark-lg"
      p={4}
    >
      <Box mb={4} position="relative">
        <Image alt="blog image" src={imgUrl} />
        {smallText ? (
          <Text
            position="absolute"
            top="10px"
            left="10px"
            color="white"
            bgColor="cyan.500"
            rounded="full"
            fontSize="xs"
            py={2}
            px={4}
            textTransform="uppercase"
            fontWeight="semibold"
          >
            {smallText}
          </Text>
        ) : null}
      </Box>
      <Stack spacing={4} mb={4}>
        <Heading fontSize="large" textAlign="center" textTransform="uppercase">
          {title}
        </Heading>
        <Text>{description}</Text>
        <Button colorScheme={'green'} textTransform="uppercase">
          Start
        </Button>
      </Stack>
    </Box>
  );
}
