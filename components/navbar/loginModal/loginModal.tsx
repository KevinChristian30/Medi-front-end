import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./loginModal.module.css";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { 
  GoogleAuthProvider, 
  UserCredential, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import loginImage from "../../../public/login-image.jpg";
import Image from "next/image";
import { TextField } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Toast from "../../utilities/toast/toast";
import { useRouter } from "next/router";

interface IsLoading {
  googleLogin: boolean;
  emailAndPasswordLogin: boolean;
}

interface FormValues {
  email: string;
  password: string;
}

const LoginModal = () => {
  const [user, loading, error] = useAuthState(auth);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<IsLoading>({
    googleLogin: false,
    emailAndPasswordLogin: false
  });

  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: ''
  });

  const router = useRouter();

  const googleAuth: GoogleAuthProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      setIsLoading({
        ...isLoading,
        googleLogin: true
      });

      const result = await signInWithPopup(auth, googleAuth);
      
      if (result) {
        setSuccessSnackbarOpen(true);
        
        router.push('/dashboard');
      } else {
        setErrorSnackbarOpen(true);
      }
    } catch (exception) {
      setErrorSnackbarOpen(true);
    }

    setIsLoading({
      ...isLoading,
      googleLogin: false
    });
  };

  const loginWithEmailAndPassword = async() => {
    setIsLoading({
      ...isLoading,
      emailAndPasswordLogin: true
    });

    try {
      const userCredential: UserCredential = 
        await signInWithEmailAndPassword(auth, formValues.email, formValues.password);

      if (userCredential) {
        setSuccessSnackbarOpen(true);
        
        router.push('/dashboard');
      } else {
        setErrorSnackbarOpen(true);
      }
    } catch (e) {
      setErrorSnackbarOpen(true);
    }

    setIsLoading({
      ...isLoading,
      emailAndPasswordLogin: false
    });
  }

  return ( 
    <>
      <div className={style.loginModal}>
        <div className={style.left}>
          <Image src={loginImage} alt="Happy and Healthy" className={style.image}></Image>
          <div className={style.filter}></div>
          <FontAwesomeIcon icon={faNotesMedical} className={style.logo} size="2xl"/>
        </div>
        <div className={style.right}>
          <div className={style.top}>
            <h1 className={style.logInText}>Login</h1>
          </div>
          <form className={style.middle} onSubmit={loginWithEmailAndPassword}>
            <TextField 
              label="Email"
              size="small"
              fullWidth
              value={formValues.email}
              onChange={(e) => setFormValues({...formValues, email: e.target.value})}
            />
            <TextField 
              label="Password"
              size="small"
              type="password"
              fullWidth
              value={formValues.password}
              onChange={(e) => setFormValues({...formValues, password: e.target.value})}
            />
            <LoadingButton 
              type="submit"
              variant="outlined" 
              onClick={loginWithEmailAndPassword}
              fullWidth
              loading={isLoading.emailAndPasswordLogin}
              disabled={isLoading.googleLogin}
              >
              Login 
            </LoadingButton>
            <LoadingButton
              type="button"
              variant="contained"
              onClick={loginWithGoogle}
              startIcon={isLoading && <GoogleIcon sx={{fill: "#fff"}} />}
              fullWidth
              loading={isLoading.googleLogin}
              disabled={isLoading.emailAndPasswordLogin}>
              Login with Google
            </LoadingButton>
          </form>
          <div className={style.bottom}>
            <div>
              Don't have an account? Register <span> </span>
              <Link href="/register" className={style.registerLink}>
                here
              </Link>
            </div>
            <Link href="/forgot-password" className={style.registerLink}>Forgot Password?</Link>
          </div>
        </div>
      </div>

      <Toast 
        isOpen={successSnackbarOpen}
        closeToast={() => setSuccessSnackbarOpen(false)}
        message={`Welcome, ${user?.displayName ? user?.displayName : user?.email}! Redirecting you...`}
      />
      <Toast 
        isOpen={errorSnackbarOpen}
        closeToast={() => setErrorSnackbarOpen(false)}
        message='Login failed, please try again!'
        severity="error"
      />
    </>
   );
}
 
export default LoginModal;