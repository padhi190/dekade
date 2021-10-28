import {
  Grid,
  Center,
  Heading,
  Box,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from '../../components/Card';

export function getStaticProps() {
  const courses = [
    {
      title: '7 Kesalahan WO',
      description:
        'Di webinar ini, anda akan mempelajari 7 kesalahan WO yang dapat menghancurkan reputasi WO anda. Bangun reputasi WO anda dengan menghindari 7 kesalahan ini.',
      imgUrl: 'wsw1.png',
      smallText: 'best selling',
    },
    {
      title: 'Rahasia New Normal Wedding dengan 3 Crew',
      description:
        'Idealnya berapa orang sih untuk handle intimate wedding ini?? Dapatkan jawabannya disini!',
      imgUrl: 'wsw2.png',
    },
    {
      title: '7 Langkah Mendapatkan Klien Pertama',
      description:
        'Kalo mau umur bisnis WO nya panjang dan sukses, ikuti deh 7 Langkah Jitu Mendapatkan Klien Pertama',
      imgUrl: 'wsw3.png',
    },
    {
      title: '9 Langkah Mendapatkan Klien Pertama',
      description:
        'Kalo mau umur bisnis WO nya panjang dan sukses, ikuti deh 7 Langkah Jitu Mendapatkan Klien Pertama',
      imgUrl: 'wsw3.png',
    },
  ];

  return {
    props: { courses },
  };
}

export default function Courses({ courses }) {
  return (
    <Box pt={20} px={4}>
      <Heading fontSize={'2xl'} mb={4}>
        Watch All Courses
      </Heading>
      <Divider
        variant="dashed"
        borderColor={useColorModeValue('gray.900', 'gray.100')}
      />
      <Center my={4}>
        <Grid
          templateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
          gap={6}
          rowGap={10}
          justifyItems="center"
          align="center"
          gridAutoRows="1fr"
        >
          {courses.map((course) => (
            <Card key={course.title} course={course} />
          ))}
        </Grid>
      </Center>
    </Box>
  );
}
