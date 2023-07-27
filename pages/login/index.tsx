import { NextPage } from "next";
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

    console.log(result);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return ( 
    <>
      <div className={style.loginPageContent}>
        <Button variant="contained" onClick={() => auth.signOut()}>Log out</Button>
        <Button variant="contained" onClick={login}>Log In</Button>
        {
          user && "Welcome, " + user.displayName
        }
      </div>
    </>
   );
}
 
export default Login