import { useAuthState } from "react-firebase-hooks/auth";
import style from "./navbar.module.css";
import { auth } from "../../../firebase/firebaseConfig";
import LoadingScreen from "../../../components/loading/loadingScreen";
import { useRouter } from "next/router";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  const logout = async () => {
    await auth.signOut();

    router.push('/');
  }

  if (loading) return <LoadingScreen  />
  return ( 
    <div className={style.navbar}>
      <div className={style.left}>
        Welcome, {user?.email}
      </div>
      <div className={style.right} onClick={logout}>
        Logout
      </div>
    </div>
   );
}
 
export default Navbar;