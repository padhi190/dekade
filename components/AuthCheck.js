import { useContext } from 'react';
import { UserContext } from '../lib/context';
import SignInBox from './SignInBox';

const AuthCheck = ({ children, adminContent = false }) => {
  const user = useContext(UserContext);
  const isAdmin = user?.admin;
  let hasAccess = true;
  if (adminContent) {
    if (!isAdmin) {
      hasAccess = false;
    }
  }

  return user ? (
    !hasAccess ? (
      <div>You do not have permission</div>
    ) : (
      children
    )
  ) : (
    <SignInBox />
  );
};

export default AuthCheck;
