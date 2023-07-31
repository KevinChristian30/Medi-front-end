import Head from 'next/head';
import React from 'react'
import style from "./index.module.css";
import forgotPasswordImage from "/public/forgot-password-image.svg";
import Image from 'next/image';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Link from 'next/link';
import { useState } from 'react';
import Error from '../../types/error';
import { useRouter } from 'next/router';

interface FormValues {
  email: string;
}

interface FormErrors {
  email: Error;
}

const ForgotPassword = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: {
      isError: false,
      message: ''
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  const router = useRouter();

  const areFormValuesValid = () : boolean => {
    let newFormErrors: FormErrors = {
      email: {
        isError: false,
        message: ''
      },
    };

    const validateEmail = () : boolean => {
      if (!formValues.email.includes('@')) {
        newFormErrors.email.isError = true;
        newFormErrors.email.message = 'Invalid Email Address';  
      }

      return false;
    }

    setFormErrors(newFormErrors);

    return validateEmail();
  }

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!areFormValuesValid()) return;

    setIsLoading(true);
  }

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
            <form className={style.middle} onSubmit={sendEmail}>
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
                loading={isLoading}
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