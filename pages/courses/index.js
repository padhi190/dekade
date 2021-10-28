import {
  Grid,
  Center,
  Heading,
  Box,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from '../../components/Card';

export default function Courses() {
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
        >
          <Card />
          <Card />
          <Card />
          <Card />
        </Grid>
      </Center>
    </Box>
  );
}
