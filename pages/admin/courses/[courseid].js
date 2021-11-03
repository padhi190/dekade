import { useRouter } from 'next/router';
import {
  Box,
  Stack,
  Flex,
  Input,
  Button,
  Divider,
  FormControl,
  FormLabel,
  useColorModeValue,
  Textarea,
  Checkbox,
  Heading,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getLessons, getCourses } from '../../../lib/firebase';
import AuthCheck from '../../../components/AuthCheck';

export default function EditLesson() {
  const router = useRouter();
  const courseId = router.query.courseid;
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonsList, setLessonsList] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const activeBgColor = useColorModeValue('gray.300', 'gray.700');
  const nonActiveBgColor = useColorModeValue('gray.100', 'gray.900');

  async function updateLessonsList() {
    const lessons = await getLessons(courseId);
    setLessonsList(lessons);
    setCurrentLesson(lessons[0]);
  }

  useEffect(() => {
    (async () => {
      await updateLessonsList();
      const courseArr = await getCourses([courseId]);
      setCurrentCourse(courseArr[0]);
    })();
  }, []);

  const onAddLesson = async (data) => {
    reset();
  };

  const onUpdateLesson = async (e) => {
    e.preventDefault();
  };

  const onDeleteLesson = async () => {
    if (confirm('are you sure?')) {
    }
  };

  return (
    <AuthCheck>
      <Box pt={20}>
        <Stack direction={['column-reverse', 'column-reverse', 'row', 'row']}>
          <Stack
            direction="column"
            h="100vh"
            minW="250px"
            bgColor={useColorModeValue('gray.100', 'gray.900')}
            px={[2, 2, 4, 4]}
            pt={4}
            overflow="scroll"
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
            <Box mb={4}>
              <Stack as="form" onSubmit={handleSubmit(onAddLesson)} spacing={4}>
                <Input
                  type="text"
                  {...register('title', { required: true })}
                  placeholder="Lesson Title"
                  w="99%"
                  mx="auto"
                  focusBorderColor={useColorModeValue('gray.800', 'white')}
                  borderColor={useColorModeValue('gray.800', 'white')}
                />
                <Button type="submit" colorScheme="green" w="100%">
                  Add Lesson
                </Button>
              </Stack>
            </Box>
            <Divider
              variant="dashed"
              borderColor={useColorModeValue('gray.900', 'gray.100')}
            />
            <Box>
              {lessonsList?.map((lesson) => (
                <Stack
                  key={lesson.id}
                  direction="row"
                  justify="space-between"
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
                  {/* <Box>{lesson.no}</Box> */}
                  <Box>{lesson.title}</Box>
                </Stack>
              ))}
            </Box>
          </Stack>
          <Box w="100%" px={6}>
            <Heading fontSize="md" mb={4} py={4}>
              {currentCourse?.title}
            </Heading>

            <Flex
              as="form"
              onSubmit={onUpdateLesson}
              gridGap={4}
              flexDirection="column"
            >
              <Flex gridGap={4}>
                <FormControl>
                  <FormLabel>No</FormLabel>
                  <Input
                    type="text"
                    value={currentLesson?.no || ''}
                    onChange={(e) =>
                      setCurrentLesson({
                        ...currentLesson,
                        no: e.target.value,
                      })
                    }
                    focusBorderColor="lime"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Icon</FormLabel>
                  <Input
                    type="text"
                    value={currentLesson?.icon || ''}
                    onChange={(e) =>
                      setCurrentLesson({
                        ...currentLesson,
                        icon: e.target.value,
                      })
                    }
                    focusBorderColor="lime"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Duration</FormLabel>
                  <Input
                    type="text"
                    value={currentLesson?.duration || ''}
                    onChange={(e) =>
                      setCurrentLesson({
                        ...currentLesson,
                        duration: e.target.value,
                      })
                    }
                    focusBorderColor="lime"
                  />
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel>Lesson Title</FormLabel>
                <Input
                  type="text"
                  value={currentLesson?.title}
                  onChange={(e) =>
                    setCurrentLesson({
                      ...currentLesson,
                      title: e.target.value,
                    })
                  }
                  focusBorderColor="lime"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  noOfLines={3}
                  value={currentLesson?.description || ''}
                  onChange={(e) =>
                    setCurrentLesson({
                      ...currentLesson,
                      description: e.target.value,
                    })
                  }
                  focusBorderColor="lime"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Video Link</FormLabel>
                <Input
                  value={currentLesson?.link || ''}
                  onChange={(e) =>
                    setCurrentLesson({
                      ...currentLesson,
                      link: e.target.value,
                    })
                  }
                  focusBorderColor="lime"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Content (Markdown)</FormLabel>
                <Textarea
                  noOfLines={3}
                  value={currentLesson?.content || ''}
                  onChange={(e) =>
                    setCurrentLesson({
                      ...currentLesson,
                      content: e.target.value,
                    })
                  }
                  focusBorderColor="lime"
                />
              </FormControl>
              <FormControl>
                <Checkbox
                  isChecked={currentLesson?.free}
                  value={currentLesson?.free}
                  onChange={(e) => {
                    setCurrentLesson({
                      ...currentLesson,
                      free: e.target.checked,
                    });
                  }}
                >
                  Free
                </Checkbox>
              </FormControl>
              <Flex
                gridGap={4}
                flexDirection={['column', 'column', 'row', 'row']}
              >
                <Button type="submit" colorScheme="green">
                  Update Lesson
                </Button>
                <Button colorScheme="red" onClick={onDeleteLesson}>
                  Delete Lesson
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Stack>
      </Box>
    </AuthCheck>
  );
}
