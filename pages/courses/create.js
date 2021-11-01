import { Box, Center, Stack, Input, Button } from '@chakra-ui/react';
import AuthCheck from '../../components/AuthCheck';

export default function CreateCourse() {
  return (
    <AuthCheck adminContent={true}>
      <Box pt={32}>CreateCourse</Box>
    </AuthCheck>
  );
}
