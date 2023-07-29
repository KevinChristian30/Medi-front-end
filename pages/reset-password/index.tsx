import Head from 'next/head';
import React from 'react';
import style from "./index.module.css";
import LockResetIcon from '@mui/icons-material/LockReset';
import { Theme } from '../../styles/globals';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingScreen from '../../components/loading/loadingScreen';
import { auth } from '../../firebase/firebaseConfig';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useState } from "react"
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from '../../components/utilities/toast/toast';
import Authorized from '../../components/gates/Authorized';

const ResetPassword = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  if (loading) return <LoadingScreen />

  const resetPassword = async () => {
    if (!user?.email) return;
    
    setIsLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, user?.email);
      setSuccessSnackbarOpen(true);
      setIsEmailSent(true);
    } catch (e) {
      setErrorSnackbarOpen(true);
    }

    setIsLoading(false);
  }

  return (
    <Authorized>
      <Head>
        <title>Reset Password</title>
      </Head>
      <main className={style.main}>
        <div className={style.container}>
          <div className={style.top}>
            <LockResetIcon 
              sx={{
                height: '50px',
                width: '50px',
                color: Theme.primary
              }}
            />
            <h3>Reset Password</h3>
          </div>
          <div className={style.middle}>
            {
              !isEmailSent ? 
              <p>
                Click the button and we will send an email to  
                <span> </span>
                <span className={style.email}>
                  {user?.email}
                </span>
                , kindly check your inbox and follow the instructions.
              </p> : 
              <p>
                We have sent an email to
                <span> </span>
                <span className={style.email}>
                  {user?.email}
                </span>
                , refresh this page after you finished the instructions.
              </p>
            }
            
          </div>
          <div className={style.bottom}>
            {
              !isEmailSent &&
              <Button
                variant='outlined'
                fullWidth
                onClick={() => router.push('/dashboard') }
              >
                Back
              </Button>
            }
            <LoadingButton
              variant='contained'
              startIcon={<SendIcon />}
              fullWidth
              onClick={resetPassword}
              loading={isLoading}
              disabled={isEmailSent}
            >
              {
                !isEmailSent ? 'Send Email' : 'Email Sent'
              }
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
    </Authorized>
  )
}

export default ResetPassword;