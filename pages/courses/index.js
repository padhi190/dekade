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

import { getAllCourses } from '../../lib/firebase';

export async function getStaticProps() {
  const courses = await getAllCourses();
  const testimonies = [
    {
      text: 'Teh Andhan ngejelasinnya masuk akal semua sesuai realita di lapangan, bermanfaat bangettt walaupun kurang puas dengan dibatasi waktu. Semoga tth akang sehat sehat semua aminnn...',
      author: 'Mia Tresna Handayani',
      role: 'Mahakarya Organizer',
      photoUrl:
        'https://lh3.googleusercontent.com/a-/AOh14GgNuMOWefZkBdGB_8w4WKHoHqqKiPZzscTwPQrmdQ=s96-c',
    },
    {
      text: 'Alhamdulillah teh Andhan selalu punya cara jitu untuk problematika di dunia per Wedding Organizer-an',
      author: 'Isfihany Fida',
      role: 'Katineung Wedding Organizer',
      photoUrl:
        'https://lh3.googleusercontent.com/a-/AOh14GgNuMOWefZkBdGB_8w4WKHoHqqKiPZzscTwPQrmdQ=s96-c',
    },
  ];

  return {
    props: { courses, testimonies },
    revalidate: 100000,
  };
}

export default function Courses(props) {
  const { courses, testimonies } = props;
  // console.log(props);
  return (
    <Box pt={20} maxW="1300px" px={[2, 2, 4, 4]} pb={100} mx="auto">
      <Heading fontSize={'2xl'} mb={4}>
        Watch All Courses
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
        gridAutoRows="1fr"
      >
        {testimonies.map((testimony) => (
          <Testimony key={testimony.author} testimony={testimony} />
        ))}
      </Grid>
    </Box>
  );
}
