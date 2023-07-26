import { NextPage } from "next";
import Navbar from "../../components/navbar/Navbar";
import style from "./index.module.css";
import { Button } from "@mui/material";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Login: NextPage = () => {
  const [user, setUser] = useAuthState(auth);

  const googleAuth: GoogleAuthProvider = new GoogleAuthProvider();

  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);


  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return ( 
    <>
      <Navbar />
      <div className={style.loginPageContent}>
        <Button variant="contained" onClick={() => auth.signOut()}>Log out</Button>
        <Button variant="contained" onClick={login}>Login</Button>
        {
          user && "Welcome, " + user.displayName
        }
      </div>
    </>
   );
}
 
export default Login