import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../lib/context';
import { Box, Text, Grid, Button, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { getCourses, getAllCourses } from '../../lib/firebase';

import CourseCard from '../../components/CourseCard';
import SignInBox from '../../components/SignInBox';

const RenderLoggedInUser = (user, courses) => {
  console.log(courses);
  if (user.subscription || user?.admin) {
    return (
      <Box pt={20} maxW="1300px" mx="auto" px={[2, 2, 4, 4]} pb={100}>
        <Text>
          Logged in as <strong>{user?.email}</strong>. You are subscribed to:
        </Text>
        <Grid
          templateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
          gap={6}
          rowGap={10}
          justifyItems="center"
          align="center"
          gridAutoRows="1fr"
          my={4}
        >
          {courses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box pt={20} maxW="1300px" mx="auto" px={[2, 2, 4, 4]} pb={100}>
        <Text mb={4}>
          Logged in as <strong>{user?.email}</strong>.
        </Text>
        <Link href="/courses" passHref>
          <Button colorScheme="green">Lihat Online Courses</Button>
        </Link>
      </Box>
    );
  }
};

export default function ProfilePage() {
  const user = useContext(UserContext);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      (async () => {
        if (user?.admin) {
          setLoading(true);
          const subscribedcourses = await getAllCourses();
          setCourses(subscribedcourses);
          setLoading(false);
        } else if (user?.subscription) {
          setLoading(true);
          const subscribedcourses = await getCourses(user?.subscription);
          setTimeout(() => {}, 5000);

          setCourses(subscribedcourses);
          setLoading(false);
        }
      })();
    } else {
      setCourses(null);
    }
  }, [user]);

  return (
    <>
      {!user ? (
        <SignInBox />
      ) : loading ? (
        <Spinner />
      ) : (
        RenderLoggedInUser(user, courses)
      )}
    </>
  );
}
