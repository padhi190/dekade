import {
  Box,
  LinkBox,
  LinkOverlay,
  Image,
  Text,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Link from 'next/link';

export default function Card(props) {
  const { title, description, imgUrl, smallText = '' } = props.course;
  // console.log(props);
  return (
    <LinkBox>
      <Link href="/" passHref>
        <LinkOverlay>
          <Flex
            // maxW={'400px'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded="10px"
            overflow="hidden"
            boxShadow="dark-lg"
            flexDirection="column"
            p={4}
            gridGap={2}
            h="100%"
          >
            <Box mb={4} position="relative">
              <Image alt="blog image" src={imgUrl} />
              {smallText ? (
                <Text
                  position="absolute"
                  top={4}
                  left={4}
                  color="white"
                  bgColor="red.500"
                  rounded="full"
                  fontSize={11}
                  py={1}
                  px={2}
                  textTransform="uppercase"
                  fontWeight="semibold"
                >
                  {smallText}
                </Text>
              ) : null}
            </Box>
            <Heading
              fontSize="large"
              textAlign="center"
              textTransform="uppercase"
              mb={4}
            >
              {title}
            </Heading>
            <Text textAlign="justify" mb={4}>
              {description}
            </Text>
            <Button colorScheme={'green'} textTransform="uppercase" mt={'auto'}>
              Start
            </Button>
          </Flex>
        </LinkOverlay>
      </Link>
    </LinkBox>
  );
}
