import {
  Grid,
  Center,
  Heading,
  Box,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from '../../components/Card';
import Testimony from '../../components/Testimony';

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
  };
}

export default function Courses(props) {
  const { courses, testimonies } = props;
  // console.log(props);
  return (
    <Box pt={20} px={4} pb={100}>
      <Heading fontSize={'2xl'} mb={4}>
        Watch All Courses
      </Heading>
      <Divider
        variant="dashed"
        borderColor={useColorModeValue('gray.900', 'gray.100')}
      />

      <Grid
        templateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={2}
        rowGap={10}
        justifyItems="center"
        align="center"
        gridAutoRows="1fr"
        my={4}
      >
        {courses.map((course) => (
          <Card key={course.title} course={course} />
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
