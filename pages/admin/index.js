import {
  Box,
  Divider,
  Stack,
  Input,
  Button,
  useToast,
  useColorModeValue,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthCheck from '../../components/AuthCheck';
import {
  getAllCourses,
  addCourse,
  editCourse,
  deleteCourse,
} from '../../lib/firebase';

const addToast = (toast, type, title) => {
  const configError = {
    status: 'error',
  };
  const configSuccess = {
    status: 'success',
  };
  const config = type === 'error' ? configError : configSuccess;

  toast({
    title,
    duration: 3000,
    isClosable: true,
    position: 'top',
    ...config,
  });
};

export default function CourseAdmin() {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [courseList, setCourseList] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  async function updateCourseList() {
    const courses = await getAllCourses();
    setCourseList(courses);
    setCurrentCourse(courses[0]);
  }

  useEffect(() => {
    (async () => {
      await updateCourseList();
    })();
  }, []);

  const onAddCourse = async (data) => {
    await addCourse(data);
    addToast(toast, 'success', 'Course added');
    await updateCourseList();
    reset();
  };

  const onUpdateCourse = async (e) => {
    e.preventDefault();
    console.log(currentCourse);
    await editCourse(currentCourse.id, currentCourse);
    addToast(toast, 'success', 'course updated');
    await updateCourseList();
  };

  const onDeleteCourse = async () => {
    if (confirm('are you sure?')) {
      await deleteCourse(currentCourse.id);
      addToast(toast, 'success', 'Course deleted');
      await updateCourseList();
    }
  };

  const activeBgColor = useColorModeValue('gray.300', 'gray.700');
  const nonActiveBgColor = useColorModeValue('gray.100', 'gray.900');
  return (
    <AuthCheck adminContent={true}>
      return (
      <Box pt="40px">
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
              <Stack as="form" onSubmit={handleSubmit(onAddCourse)} spacing={4}>
                <Input
                  type="text"
                  {...register('title', { required: true })}
                  placeholder="Course Title"
                  w="99%"
                  mx="auto"
                  focusBorderColor={useColorModeValue('gray.800', 'white')}
                  borderColor={useColorModeValue('gray.800', 'white')}
                />
                <Button type="submit" colorScheme="green" w="100%">
                  Add Course
                </Button>
              </Stack>
            </Box>
            <Divider
              variant="dashed"
              borderColor={useColorModeValue('gray.900', 'gray.100')}
            />
            <Box>
              {courseList?.map((course) => (
                <Stack
                  key={course.id}
                  direction="row"
                  justify="space-between"
                  align="center"
                  bgColor={
                    currentCourse === course ? activeBgColor : nonActiveBgColor
                  }
                  mb={2}
                  cursor="pointer"
                  transition="ease-out 0.3s"
                  _hover={{
                    bgColor: 'gray.500',
                    transform: ['', '', 'scale(1.05,1.05)', 'scale(1.05,1.05)'],
                  }}
                  p={4}
                  onClick={() => setCurrentCourse(course)}
                >
                  {/* <Box>{lesson.no}</Box> */}
                  <Box>{course.title}</Box>
                </Stack>
              ))}
            </Box>
          </Stack>
          <Box w="100%" px={6} py={10}>
            <Stack as="form" onSubmit={onUpdateCourse} spacing={4}>
              <FormControl>
                <FormLabel>Course Title</FormLabel>
                <Input
                  type="text"
                  value={currentCourse?.title}
                  onChange={(e) =>
                    setCurrentCourse({
                      ...currentCourse,
                      title: e.target.value,
                    })
                  }
                  w="99%"
                  mx="auto"
                  focusBorderColor="lime"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Course Description</FormLabel>
                <Textarea
                  noOfLines={3}
                  value={currentCourse?.description || ''}
                  onChange={(e) =>
                    setCurrentCourse({
                      ...currentCourse,
                      description: e.target.value,
                    })
                  }
                  w="99%"
                  mx="auto"
                  focusBorderColor="lime"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image Link</FormLabel>
                <Input
                  type="text"
                  value={currentCourse?.imgUrl || ''}
                  onChange={(e) =>
                    setCurrentCourse({
                      ...currentCourse,
                      imgUrl: e.target.value,
                    })
                  }
                  w="99%"
                  mx="auto"
                  focusBorderColor="lime"
                />
              </FormControl>
              <Flex
                gridGap={4}
                flexDirection={['column', 'column', 'row', 'row']}
              >
                <Button type="submit" colorScheme="green">
                  Update Course
                </Button>
                <Button colorScheme="green" variant="outline">
                  Edit Lessons
                </Button>
                <Button colorScheme="red" onClick={onDeleteCourse}>
                  Delete Course
                </Button>
              </Flex>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </AuthCheck>
  );
}
