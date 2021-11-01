import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../lib/context';
import { Box, Text, Grid, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { getCourses } from '../../lib/firebase';

import CourseCard from '../../components/CourseCard';
import SignInBox from '../../components/SignInBox';

const RenderLoggedInUser = (user, courses) => {
  if (user.subscription) {
    return (
      <Box pt={20} px={[2, 2, 4, 4]} pb={100}>
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
            <CourseCard key={course.title} course={course} />
          ))}
        </Grid>
      </Box>
    );
  } else {
    return (
      <>
        <Text mb={4}>
          Logged in as <strong>{user?.email}</strong>.
        </Text>
        <Link href="/courses" passHref>
          <Button colorScheme="green">Lihat Online Courses</Button>
        </Link>
      </>
    );
  }
};

export default function ProfilePage() {
  const user = useContext(UserContext);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    if (user) {
      (async () => {
        if (user?.subscription) {
          const subscribedcourses = await getCourses(user?.subscription);
          setCourses(subscribedcourses);
        }
      })();
    } else {
      setCourses(null);
    }
  }, [user]);

  return <>{!user ? <SignInBox /> : RenderLoggedInUser(user, courses)}</>;
}
