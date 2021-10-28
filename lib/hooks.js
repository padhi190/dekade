import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

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
  const [authData] = useAuthState(auth);
  console.log(authData);
  useEffect(() => {
    if (authData) {
      setUser(formatUser(authData));
    } else {
      setUser(null);
    }
  }, [authData]);
  return user;
};
