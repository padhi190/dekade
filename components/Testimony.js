import { Flex, Text, Avatar, Stack, useColorModeValue } from '@chakra-ui/react';

export default function Testimony({ testimony }) {
  const { comment, name, role, imgUrl } = testimony;
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
      <Text textAlign="justify">{comment}</Text>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar name={name} src={imgUrl} />
        <Stack spacing={0} alignItems="flex-start">
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="sm" mt={-2}>
            {role}
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
