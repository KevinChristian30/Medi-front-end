import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./loginModal.module.css";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useEffect } from "react";
import { faGoogle, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import loginImage from "../../../public/login-image.jpg";
import Image from "next/image";

const buttonStyle = {
  color: '#1A5D1A',
  borderColor: '#1A5D1A',
  display: 'flex',
  alignItems: 'center',
  fontWeight: '700',
  border: '2px solid',
  width: '100%',

  '&:hover': {
    color: 'white',
    borderColor: '#1A5D1A',
    backgroundColor: '#1A5D1A',
  }
};

const LoginModal = () => {
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
            onClick={login}
            startIcon={<FontAwesomeIcon icon={faGoogle}/>} 
            sx={buttonStyle}
            >
            Login with Google
          </Button>
          <p>Or</p>
          <Button 
            variant="outlined" 
            onClick={login}
            startIcon={<FontAwesomeIcon icon={faSquareFacebook}/>} 
            sx={buttonStyle}
            >
            Login with Facebook
          </Button>
        </div>
      </div>
    </div>
   );
}
 
export default LoginModal;