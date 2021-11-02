import {
  TaskEvent,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@firebase/storage';
import { useState } from 'react';
import {
  Box,
  Input,
  Spinner,
  Text,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { storage } from '../lib/firebase';

export default function ImageUploader({ courseId }) {
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const uploadFile = async (e) => {
    const file = Array.from(e.target.files)[0];
    console.log(file);
    const extension = file.type.split('/')[1];
    const storageRef = ref(storage, `courseimg/${courseId}.${extension}`);
    setUploading(true);
    uploadBytesResumable(storageRef, file)
      .then((d) => getDownloadURL(storageRef))
      .then((url) => {
        setDownloadUrl(url);
        setUploading(false);
      });
  };
  return (
    <Box>
      {uploading && <Spinner />}
      {!uploading && (
        <>
          <FormLabel as="button">
            Upload image
            <Input type="file" onChange={uploadFile} />
          </FormLabel>
        </>
      )}
      {downloadUrl && <Text>{downloadUrl}</Text>}
    </Box>
  );
}
