import Head from "next/head";
import style from "./index.module.css";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { Theme } from "../../styles/globals";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import LoadingScreen from "../../components/loading/loadingScreen";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import Toast from "../../components/utilities/toast/toast";

const EmailVerification = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  if (loading) return <LoadingScreen />;
  if (!user) router.push('/');
  if (user?.emailVerified) router.push('/dashboard');

  const sendEmail = async () => {
    if (!user) return;
    setIsLoading(true);
    
    try {
      await sendEmailVerification(user);
     
      setEmailSent(true);
      setSuccessSnackbarOpen(true);
    } catch (e) {
      setErrorSnackbarOpen(true);
    }

    setIsLoading(false);
  }

  return ( 
    user && !user?.emailVerified && 
    <>
      <Head>
        <title>Medi | Email Verification</title>
      </Head>
      <main className={style.emailVerification}>
        <div className={style.content}>
          <div className={style.top}>
            <MarkEmailReadIcon 
              sx={{
                height: '50px',
                width: '50px',
                color: Theme.primary
              }}
            />
            <h3>Verify your email address</h3>
          </div>
          {
            !emailSent ?
            <div className={style.middle}>
              <p>
                Click the button and we will send an email to  
                <span> </span>
                <span className={style.email}>
                  {user?.email}
                </span>
                , kindly check your inbox and follow the instructions.
              </p>
            </div> :
            <div className={style.middle}>
              <p>
                Email sent to 
                <span> </span>
                <span className={style.email}>
                  {user?.email}
                </span>
                , refresh the page after you verified your email address.
              </p>
            </div>
          }
          <div className={style.bottom}>
            <LoadingButton
              variant="contained"
              startIcon={<SendIcon />}
              fullWidth
              onClick={sendEmail}
              loading={isLoading}
            >
              { !emailSent ? 'Send Email' : 'Resend Email' }
            </LoadingButton>
          </div>
        </div>
      </main>
      <Toast 
        isOpen={successSnackbarOpen}
        closeToast={() => setSuccessSnackbarOpen(false)}
        message="Email sent successfully!"
      />
      <Toast 
        isOpen={errorSnackbarOpen}
        closeToast={() => setErrorSnackbarOpen(false)}
        message="Something went wrong, please try again!"
        severity="error"
      />
    </>
   );
}
 
export default EmailVerification;