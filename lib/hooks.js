import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};

export const useUserData = () => {
  const [user, setUser] = useState(null);
  const [authData, loadingUser] = useAuthState(auth);
  useEffect(() => {
    if (loadingUser) return;
    if (authData) {
      const userEmail = authData.email;
      const userRef = doc(firestore, 'users', userEmail);
      (async () => {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, formatUser(authData));
        } else {
          await updateDoc(userRef, formatUser(authData));
        }
        userSnap = await getDoc(userRef);
        setUser(userSnap.data());
      })();
    } else {
      setUser(null);
    }
  }, [authData, loadingUser]);
  return { user, loadingUser };
};
