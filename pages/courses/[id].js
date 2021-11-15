import {
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Divider,
  AspectRatio,
  Badge,
  Text,
  Flex,
  Button,
  VStack,
  List,
  ListItem,
  ListIcon,
  Center,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { UserContext } from '../../lib/context';
import { getLessons, getCourses } from '../../lib/firebase';
import SignInBox from '../../components/SignInBox';
import { LessonsList } from '../../components/LessonsList';
import PriceBox from '../../components/PriceBox';

const RenderLessonNav = ({ currentLesson, lessons, setCurrentLesson }) => {
  const curIdx = lessons?.findIndex((lesson) => lesson === currentLesson);
  const nextIdx = Math.min(curIdx + 1, lessons?.length - 1);
  const prevIdx = Math.max(curIdx - 1, 0);
  return (
    <Flex
      gridGap={4}
      ml="auto"
      justifyContent="flex-end"
      mt={4}
      flexDir={{ base: 'column', md: 'row' }}
    >
      {curIdx > 0 ? (
        <Button
          fontSize={{ base: 'sm', md: 'md' }}
          onClick={() => setCurrentLesson(lessons[prevIdx])}
        >
          {lessons[prevIdx].title.toUpperCase()}👈
        </Button>
      ) : null}
      {curIdx < lessons?.length - 1 ? (
        <Button
          fontSize={{ base: 'sm', md: 'md' }}
          onClick={() => setCurrentLesson(lessons[nextIdx])}
        >
          👉{lessons[nextIdx].title.toUpperCase()}
        </Button>
      ) : null}
    </Flex>
  );
};

const RenderLessonContent = ({
  currentLesson,
  subscribed,
  user,
  loadingUser,
  lessons,
  setCurrentLesson,
  course,
}) => {
  const bgColor = useColorModeValue('gray.200', 'gray.600');
  const dividerColor = useColorModeValue('gray.900', 'white');
  // const courseTitle = encodeURI(course?.title);
  const waText = encodeURI(
    `Halo admin, saya mau daftar online course *${course?.title}*, apakah *promo harga* ~Rp 350.000,-~ ${course?.price} dan *bonus ebook* masih ada?`
  );
  const walink = `https://api.whatsapp.com/send?phone=6281333308856&text=${waText}`;
  if (loadingUser || !currentLesson) {
    return <div>Loading...</div>;
  }
  if (!currentLesson?.free) {
    if (!user) {
      return (
        <Flex
          bgColor={bgColor}
          justifyContent="space-around"
          align="center"
          px={[2, 2, 4, 4]}
          pt={8}
          w="100%"
          overflow="auto"
          flexDir={{ base: 'column', md: 'row' }}
        >
          <PriceBox course={course} walink={walink} />
          <SignInBox />
        </Flex>
      );
    }
    if (!subscribed) {
      return (
        <Center bgColor={bgColor} py={16} px={[2, 2, 4, 4]} w="100%">
          <PriceBox course={course} walink={walink} />
        </Center>
      );
    }
  }
  return (
    <Box
      bgColor={bgColor}
      px={[2, 2, 4, 4]}
      pt={6}
      pb={12}
      w="100%"
      h={{ md: '100vh' }}
      overflowY="scroll"
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
      <Flex justifyContent="space-between" alignItems="center">
        <Heading fontSize="2xl" mb={1}>
          {currentLesson?.title}
        </Heading>
      </Flex>
      <Text mb={4}>{currentLesson?.description}</Text>
      <Divider borderColor={dividerColor} mb={4} />
      {currentLesson?.link ? (
        <Box>
          <AspectRatio ratio={16 / 9}>
            <iframe title="title" src={currentLesson?.link} allowFullScreen />
          </AspectRatio>
        </Box>
      ) : null}
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {currentLesson?.content}
      </ReactMarkdown>
      <RenderLessonNav
        currentLesson={currentLesson}
        lessons={lessons}
        setCurrentLesson={setCurrentLesson}
      />
    </Box>
  );
};

export default function CoursePage() {
  const { user, loadingUser } = useContext(UserContext);
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(false);
  const [lessons, setLessons] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [course, setCourse] = useState(null);

  const checkSubscription = () => {
    if (user?.admin || user?.subscription?.includes(router.query.id)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!loadingUser) {
      setSubscribed(checkSubscription());
    }
    (async () => {
      try {
        const lessonsProm = getLessons(router.query.id);
        const coursesProm = getCourses([router.query.id]);
        const [lessonsArr, coursesArr] = await Promise.all([
          lessonsProm,
          coursesProm,
        ]);
        setCourse(coursesArr[0]);
        setLessons(lessonsArr);
        if (lessonsArr.length) {
          setCurrentLesson(lessonsArr[0]);
        }
      } catch (error) {}
    })();
  }, [user, loadingUser]);

  return (
    <Box pt={16}>
      <Stack
        direction={[
          'column-reverse',
          'column-reverse',
          'column-reverse',
          'row',
        ]}
      >
        <LessonsList
          lessons={lessons}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          course={course}
        />
        <RenderLessonContent
          currentLesson={currentLesson}
          subscribed={subscribed}
          user={user}
          loadingUser={loadingUser}
          lessons={lessons}
          setCurrentLesson={setCurrentLesson}
          course={course}
        />
      </Stack>
    </Box>
  );
}
