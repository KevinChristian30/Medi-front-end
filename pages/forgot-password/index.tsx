import Head from 'next/head';
import React from 'react'
import style from "./index.module.css";
import forgotPasswordImage from "/public/forgot-password-image.svg";
import Image from 'next/image';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <>
      <Head>
        <title>Medi | Register</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className={style.index}>
        <div className={style.content}>
          <div className={style.left}>
            <Image 
              src={forgotPasswordImage}
              alt='Forgot Password'
              className={style.forgotPasswordImage}
            />
            <p>
              Don't worry, it happens. Just give us your email and we will reset your password.
            </p> 
          </div>
          <div className={style.right}>
            <div className={style.top}>
              <h2>Forgot Password</h2>
            </div>
            <form className={style.middle}>
              <TextField 
                label="Email"
                size="small"
                fullWidth
              />
              <LoadingButton
                variant='contained'
                type='submit'
                startIcon={<SendIcon />}
                fullWidth
              >
                Send Email                
              </LoadingButton>
            </form>
            <div className={style.bottom}>
              <Link href='/' className={style.loginLink}>
                <h5>Back to Home Page</h5>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPassword;