import { initializeApp, getApp, getApps } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  getDocs,
  query,
  where,
  documentId,
  addDoc,
  updateDoc,
  orderBy,
  doc,
  deleteDoc,
} from '@firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const storage = getStorage(app, 'gs://dekade-training.appspot.com');
export const firestore = getFirestore(app);
export const auth = getAuth(app);
const EMULATORS_STARTED = 'EMULATORS_STARTED';
if (
  !global[EMULATORS_STARTED] &&
  process.env.NEXT_PUBLIC_DB_HOST === 'localhost'
) {
  global[EMULATORS_STARTED] = true;
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

export const getAllCourses = async () => {
  const courseRef = collection(firestore, 'courses');
  const courseColl = await getDocs(courseRef);
  const courses = [];
  courseColl.forEach((course) =>
    courses.push({ ...course.data(), id: course.id })
  );
  return courses;
};

export const getCourses = async (ids) => {
  const courseRef = collection(firestore, 'courses');
  const courseQuery = query(courseRef, where(documentId(courseRef), 'in', ids));
  const courseColl = await getDocs(courseQuery);
  const courses = [];
  courseColl.forEach((course) =>
    courses.push({ ...course.data(), id: course.id })
  );

  return courses;
};

export const addCourse = async (data) => {
  const courseRef = collection(firestore, 'courses');
  const docRef = await addDoc(courseRef, { ...data });
  return docRef;
};

export const editCourse = async (id, data) => {
  const courseRef = doc(firestore, 'courses', id);
  const docResult = await updateDoc(courseRef, data);
  return docResult;
};

export const deleteCourse = async (id) => {
  const courseRef = doc(firestore, 'courses', id);
  await deleteDoc(courseRef);
  return;
};

export const getLessons = async (courseId) => {
  const courseRef = collection(firestore, 'courses', courseId, 'lessons');
  const courseSnap = await getDocs(query(courseRef, orderBy('no', 'asc')));
  const lessons = [];
  courseSnap.forEach((lesson) =>
    lessons.push({ ...lesson.data(), id: lesson.id })
  );
  return lessons;
};

export const addLesson = async (courseId, data) => {
  const lessonsRef = collection(firestore, 'courses', courseId, 'lessons');
  const docRef = await addDoc(lessonsRef, { ...data });
  return docRef;
};

export const deleteLesson = async (courseId, lessonId) => {
  const lessonRef = doc(firestore, 'courses', courseId, 'lessons', lessonId);
  await deleteDoc(lessonRef);
  return;
};

export const editLesson = async (courseId, lessonId, data) => {
  const lessonRef = doc(firestore, 'courses', courseId, 'lessons', lessonId);
  const docResult = await updateDoc(lessonRef, data);
  return docResult;
};

export const getAllTestimonies = async () => {
  const testimonyRef = collection(firestore, 'testimony');
  const testimonyColl = await getDocs(testimonyRef);
  const testi = [];
  testimonyColl.forEach((testimony) =>
    testi.push({ ...testimony.data(), id: testimony.id })
  );
  return testi;
};
