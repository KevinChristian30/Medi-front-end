import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./loginModal.module.css";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useEffect } from "react";
import loginImage from "../../../public/login-image.jpg";
import Image from "next/image";
import { Button, TextField, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";

const LoginModal = () => {
  const [user, setUser] = useAuthState(auth);

  const googleAuth: GoogleAuthProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
    } catch {

    }
  };

  const loginWithEmailAndPassword = async() => {
    
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return ( 
    <div className={style.loginModal}>
      <div className={style.left}>
        <Image src={loginImage} alt="Happy and Healthy" className={style.image}></Image>
        <div className={style.filter}></div>
      </div>
      <div className={style.right}>
        <div className={style.top}>
          <FontAwesomeIcon icon={faNotesMedical} size="2xl"/>
          <h1 className={style.logInText}>Login</h1>
        </div>
        <div className={style.bottom}>
          <TextField 
            label="Email"
            size="small"
            fullWidth
          />
          <TextField 
            label="Password"
            size="small"
            type="password"
            fullWidth
          />
          <Button 
            variant="outlined" 
            onClick={loginWithEmailAndPassword}
            fullWidth>
            Login 
          </Button>
          <Button
            variant="contained"
            onClick={loginWithGoogle}
            startIcon={<GoogleIcon sx={{fill: "#fff"}} />}
            fullWidth
            >
            Login with Google
          </Button>
        </div>
        <div className={style.registerContainer}>
          Don't have an account? Register <Link href="/register" className={style.registerLink}>here</Link>
        </div>
      </div>
    </div>
   );
}
 
export default LoginModal;