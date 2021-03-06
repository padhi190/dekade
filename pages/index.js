import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  Stack,
  Image,
  Grid,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';
import Card from 'card-vibes';
import { getAllCourses, getAllTestimonies } from '../lib/firebase';
import CourseCard from '../components/CourseCard';
import Testimony from '../components/Testimony';

export async function getStaticProps() {
  const courses = await getAllCourses();
  const testimonies = await getAllTestimonies();

  return {
    props: { courses, testimonies },
    revalidate: 3600,
  };
}

export default function Home({ courses, testimonies }) {
  const heroImgUrl =
    'https://firebasestorage.googleapis.com/v0/b/dekade-training.appspot.com/o/courseimg%2Fhero-img.png?alt=media&token=c0167f68-9e00-41db-8e51-3b3c93b57fe9';
  return (
    <Box
      pt={16}
      px={['2', '2', '4', '4']}
      w="100%"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Flex
        pt={{ base: '4', md: '16' }}
        flexDir={['column', 'column', 'column', 'row']}
        justifyContent="space-between"
        gridGap={8}
      >
        <Box maxW={{ base: '100%', lg: '50%' }}>
          <Heading
            fontSize={{ base: 'xl', md: '3xl' }}
            textTransform="uppercase"
            mb={{ base: '8', md: '16' }}
          >
            <Box
              as="span"
              bgGradient="linear(to-l, orange.500, orange.300)"
              bgClip="text"
            >
              Build and Grow
            </Box>{' '}
            your Wedding Organizer Business
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            mb={{ base: '8', md: '10' }}
          >
            Temukan rahasia menjadi{' '}
            <Box
              as="span"
              bgGradient="linear(to-l, orange.500, red.500)"
              borderRadius="md"
              p={0.5}
            >
              Wedding Organizer Profesional
            </Box>{' '}
            di DEKADE WO Class & Communication. Dengan belajar langsung dari{' '}
            <strong>Praktisi WO</strong> yang sudah 10 tahun lebih hilir mudik
            di dunia Wedding, anda akan mempercepat proses membangun dan
            mengembangkan WO anda.
          </Text>
          <Stack direction="row" spacing={4}>
            <Button
              colorScheme="red"
              color={useColorModeValue('gray.700', 'gray.100')}
              variant="outline"
              borderColor="red.700"
              borderWidth="medium"
              fontSize={{ base: 'sm', md: 'lg' }}
            >
              FREE LESSONS
            </Button>
            <Link href="/courses" passHref>
              <Button
                colorScheme="green"
                color={useColorModeValue('gray.700', 'gray.100')}
                variant="outline"
                borderColor="green.700"
                borderWidth="medium"
                fontSize={{ base: 'sm', md: 'lg' }}
              >
                ONLINE COURSE
              </Button>
            </Link>
          </Stack>
        </Box>
        <Link href="/courses" passHref>
          <Card
            style={{
              width: '100%',
              padding: '5px',
              borderRadius: '20px',
              border: 'solid 3px white',
            }}
          >
            <Box cursor="pointer">
              <Image
                borderRadius={'xl'}
                src={heroImgUrl}
                alt="hero-image"
                fit="contain"
              />
            </Box>
          </Card>
        </Link>
      </Flex>
      <Heading fontSize={'2xl'} mt={8} mb={4}>
        Latest Courses
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
        mt={4}
        mb={16}
        px={['2', '2', '4', '4']}
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
        mb={100}
      >
        {testimonies.map((testimony) => (
          <Testimony key={testimony.name} testimony={testimony} />
        ))}
      </Grid>
    </Box>
  );
}
