import {
  Box,
  LinkBox,
  LinkOverlay,
  Image,
  Text,
  Heading,
  Flex,
  Button,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Link from 'next/link';

export default function CourseCard(props) {
  const { id, title, description, imgUrl, smallText = '' } = props.course;
  // console.log(props);
  return (
    <LinkBox>
      <Link href={`/courses/${id}`} passHref>
        <LinkOverlay>
          <Flex
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
                <Tag
                  position="absolute"
                  top={4}
                  left={4}
                  bgColor="red.500"
                  fontSize={10}
                  color="white"
                  py={1}
                  px={2}
                  textTransform="uppercase"
                  fontWeight="semibold"
                >
                  <TagLabel>{smallText}</TagLabel>
                </Tag>
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
