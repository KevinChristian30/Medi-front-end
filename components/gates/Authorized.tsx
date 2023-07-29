import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import LoadingScreen from "../loading/loadingScreen";

interface Props {
  children: ReactNode;
}

const Authorized = (props: Props) => {
  const { children } = props;
  
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <LoadingScreen />;
  if (!user) router.push('/');
  if (!user?.emailVerified) router.push('/email-verification');

  return ( 
    user && user.emailVerified &&
    <>
      {children}
    </>
   );
}
 
export default Authorized;