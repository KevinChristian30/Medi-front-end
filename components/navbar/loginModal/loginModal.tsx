import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./loginModal.module.css";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useEffect } from "react";
import loginImage from "../../../public/login-image.jpg";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Logo from "../../logo/logo";

const LoginModal = () => {
  const [user, setUser] = useAuthState(auth);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  const googleAuth: GoogleAuthProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      
      result ? openSuccessSnackbar() : openErrorSnackbar();
    } catch (exception) {
      openErrorSnackbar();
    }
  };

  const loginWithEmailAndPassword = async() => {
  }

  useEffect(() => {
    
  }, [user]);

  const openSuccessSnackbar = () => setSuccessSnackbarOpen(true);
  const closeSuccessSnackbar = () => setSuccessSnackbarOpen(false);

  const openErrorSnackbar = () => setErrorSnackbarOpen(true);
  const closeErrorSnackbar = () => setErrorSnackbarOpen(false);

  return ( 
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

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={5000}
        onClose={closeSuccessSnackbar}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Alert 
            variant="standard"
            onClose={closeSuccessSnackbar} 
            severity="success" sx={{}}>
              Welcome, {user?.displayName}!
          </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={closeErrorSnackbar}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Alert 
            variant="standard"
            onClose={closeErrorSnackbar} 
            severity="error">
              Login failed, please try again!
          </Alert>
      </Snackbar>
    </div>
   );
}
 
export default LoginModal;