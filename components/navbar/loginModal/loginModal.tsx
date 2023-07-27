import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./loginModal.module.css";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useEffect } from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import loginImage from "../../../public/login-image.jpg";
import Image from "next/image";
import { Button, TextField } from "@mui/material";

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
          <h1 className={style.logInText}>Log In</h1>
        </div>
        <div className={style.bottom}>
          <Button
            variant="outlined"
            onClick={loginWithGoogle}
            startIcon={<FontAwesomeIcon icon={faGoogle}/>}
            fullWidth>
            Login with Google
          </Button>
          <p>Or</p>
          <div className={style.loginFormContainer}>
            <TextField 
              label="Email"
              size="small"
            />
            <TextField 
              label="Password"
              size="small"
            />
            <Button 
              variant="contained" 
              onClick={loginWithEmailAndPassword}
              fullWidth>
              Login 
            </Button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default LoginModal;