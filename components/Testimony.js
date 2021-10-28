import { Flex, Text, Avatar, Stack, useColorModeValue } from '@chakra-ui/react';

export default function Testimony({ testimony }) {
  const { text, author, role, photoUrl } = testimony;
  return (
    <Flex
      //   maxW={'500px'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded="10px"
      overflow="hidden"
      boxShadow="dark-lg"
      flexDirection="column"
      justifyContent="space-between"
      p={6}
      gridGap={2}
      h="100%"
      my={6}
    >
      <Text textAlign="justify">{text}</Text>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar src={photoUrl} />
        <Stack spacing={0} alignItems="flex-start">
          <Text fontWeight="bold">{author}</Text>
          <Text fontSize="sm" mt={-2}>
            {role}
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
