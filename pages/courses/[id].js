import {
  Box,
  Stack,
  Heading,
  Text,
  Divider,
  AspectRatio,
  Badge,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { UserContext } from '../../lib/context';
import { getLessons } from '../../lib/firebase';
import SignInBox from '../../components/SignInBox';

const RenderLessonContent = ({ currentLesson, subscribed, user }) => {
  console.log(subscribed);
  if (!currentLesson?.free) {
    if (!user) {
      return (
        <Box
          bgColor="gray.600"
          px={[2, 2, 4, 4]}
          pt={4}
          w="100%"
          overflow="auto"
        >
          <SignInBox />
        </Box>
      );
    }
    if (!subscribed) {
      return <div>Buy course</div>;
    }
  }
  return (
    <Box
      bgColor="gray.600"
      px={[2, 2, 4, 4]}
      pt={6}
      pb={12}
      w="100%"
      overflow="auto"
    >
      <Heading fontSize="2xl" mb={4}>
        {currentLesson?.title}
      </Heading>
      <Divider color="white" />
      <Box mt={4}>
        <AspectRatio ratio={16 / 9}>
          <iframe title="title" src={currentLesson?.link} allowFullScreen />
        </AspectRatio>
      </Box>
      <ReactMarkdown>{currentLesson?.content}</ReactMarkdown>
    </Box>
  );
};

export default function CoursePage() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(false);
  const [lessons, setLessons] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  const checkSubscription = () => {
    if (user?.admin || user?.subscription?.includes(router.query.id)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setSubscribed(checkSubscription());
    (async () => {
      try {
        const lessonsArr = await getLessons(router.query.id);
        setLessons(lessonsArr);
        if (lessonsArr.length) {
          setCurrentLesson(lessonsArr[0]);
        }
      } catch (error) {}
    })();
  }, [user]);

  return (
    <Box pt={16} maxW="1300px">
      <Stack
        direction={['column-reverse', 'column-reverse', 'row', 'row']}
        spacing={6}
      >
        <Box
          bgColor="gray.700"
          px={[2, 2, 4, 4]}
          pt={4}
          minW="250px"
          h="100vh"
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
          {lessons?.map((lesson) => (
            <Stack
              key={lesson.id}
              direction="row"
              justify="space-between"
              align="center"
              bgColor={currentLesson === lesson ? 'gray.600' : 'gray.700'}
              mb={2}
              cursor="pointer"
              transition="ease-out 0.3s"
              _hover={{
                bgColor: 'gray.600',
                transform: ['', '', 'scale(1.05,1.05)', 'scale(1.05,1.05)'],
              }}
              p={4}
              onClick={() => setCurrentLesson(lesson)}
            >
              <Box>{lesson.no}</Box>
              <Box>{lesson.title}</Box>
              <Stack>
                {lesson.free ? <Badge colorScheme="green">FREE</Badge> : null}
                <Box>{lesson.duration}</Box>
              </Stack>
            </Stack>
          ))}
        </Box>
        <RenderLessonContent
          currentLesson={currentLesson}
          subscribed={subscribed}
          user={user}
        />
      </Stack>
    </Box>
  );
}
