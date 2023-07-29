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

const ResetPassword = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <LoadingScreen />

  return (
    <>
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
            <p>
                Click the button and we will send an email to  
                <span> </span>
                <span className={style.email}>
                  {user?.email}
                </span>
                , kindly check your inbox and follow the instructions.
              </p>
          </div>
          <div className={style.bottom}>
            <Button
              variant='outlined'
              fullWidth
              onClick={() => router.push('/dashboard') }
            >
              Back
            </Button>
            <LoadingButton
              variant='contained'
              startIcon={<SendIcon />}
              fullWidth
            >
              Send Email
            </LoadingButton>
          </div>
        </div>
      </main>
    </>
  )
}

export default ResetPassword;