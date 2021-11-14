import {
  Grid,
  Center,
  Heading,
  Box,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import CourseCard from '../../components/CourseCard';
import Testimony from '../../components/Testimony';

import { getAllCourses, getAllTestimonies } from '../../lib/firebase';

export async function getStaticProps() {
  const courses = await getAllCourses();
  const testimonies = await getAllTestimonies();

  return {
    props: { courses, testimonies },
    revalidate: 3600,
  };
}

export default function Courses(props) {
  const { courses, testimonies } = props;
  // console.log(props);
  return (
    <Box
      pt={20}
      maxW="1300px"
      px={[2, 2, 4, 4]}
      pb={100}
      mx="auto"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Heading fontSize={'2xl'} mb={4}>
        Online Courses
      </Heading>
      <Divider
        variant="dashed"
        borderColor={useColorModeValue('gray.900', 'gray.100')}
      />

      <Grid
        templateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={6}
        rowGap={10}
        justifyItems="center"
        align="center"
        gridAutoRows="1fr"
        my={4}
        px={[2, 2, 4, 4]}
      >
        {courses.map((course) => (
          <CourseCard key={course.title} course={course} />
        ))}
      </Grid>

      <Heading fontSize={'2xl'} mb={4} mt={12}>
        Testimony
      </Heading>
      <Divider
        variant="dashed"
        borderColor={useColorModeValue('gray.900', 'gray.100')}
      />
      <Grid
        templateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
        gap={6}
        rowGap={10}
        // justifyItems="center"
        align="center"
        px={[2, 2, 4, 4]}
      >
        {testimonies.map((testimony) => (
          <Testimony key={testimony.name} testimony={testimony} />
        ))}
      </Grid>
    </Box>
  );
}
