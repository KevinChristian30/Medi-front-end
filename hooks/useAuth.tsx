import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";
import LoadingScreen from "../components/loading/loadingScreen";

const UseAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <LoadingScreen />;

  if (!user) router.push('/');

  if (!user?.emailVerified) router.push('/email-verification');

  return ( 
    <div>
    </div>
   );
}
 
export default UseAuth;