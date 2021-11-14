import {
  Box,
  useColorModeValue,
  Heading,
  Divider,
  Flex,
  Stack,
  Text,
  Badge,
} from '@chakra-ui/react';

export const LessonsList = ({
  lessons,
  setCurrentLesson,
  course,
  currentLesson,
}) => {
  const activeBgColor = useColorModeValue('gray.300', 'gray.700');
  const nonActiveBgColor = useColorModeValue('gray.100', 'gray.900');

  const textColor = useColorModeValue('gray.700', 'gray.200');
  return (
    <div>
      <Box
        bgColor={useColorModeValue('gray.100', 'gray.900')}
        px={[2, 2, 4, 4]}
        pt={4}
        w={['100%', '100%', '100%', '100%']}
        h="100vh"
        overflowY="scroll"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'white',
            borderRadius: '24px',
          },
        }}
      >
        <Heading size="md" mb={2}>
          {course?.title}
        </Heading>
        <Divider
          borderColor={useColorModeValue('gray.700', 'gray.100')}
          variant="dashed"
          mb={2}
        />
        {lessons?.map((lesson) => (
          <Flex
            key={lesson.id}
            direction="row"
            align="center"
            bgColor={
              currentLesson === lesson ? activeBgColor : nonActiveBgColor
            }
            mb={2}
            cursor="pointer"
            transition="ease-out 0.3s"
            _hover={{
              bgColor: 'gray.500',
              transform: ['', '', 'scale(1.05,1.05)', 'scale(1.05,1.05)'],
            }}
            p={4}
            onClick={() => setCurrentLesson(lesson)}
          >
            <Box px={1}>{lesson.icon}</Box>
            <Stack px={4} spacing={0} alignSelf="start">
              <Text
                noOfLines={2}
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {lesson.title}
              </Text>
              <Text noOfLines={3} fontSize="smaller" color={textColor}>
                {lesson.description}
              </Text>
            </Stack>
            <Stack ml="auto" fontSize="smaller">
              {lesson.free ? (
                <Badge colorScheme="green" variant="solid">
                  FREE
                </Badge>
              ) : null}
              <Box>{lesson.duration}</Box>
            </Stack>
          </Flex>
        ))}
      </Box>
    </div>
  );
};
