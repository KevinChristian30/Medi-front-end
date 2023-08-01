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
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import Toast from '../../components/utilities/toast/toast';

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
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  const router = useRouter();

  const areFormValuesValid = async () : Promise<boolean> => {
    let newFormErrors: FormErrors = {
      email: {
        isError: false,
        message: ''
      },
    };

    const isEmailUnique = async () : Promise<boolean> => {
      try {
        const methods: string[] = await fetchSignInMethodsForEmail(auth, formValues.email);
        
        return methods.length == 0;
      } catch (e) {
        return false;
      }
    }

    const validateEmail = async () : Promise<boolean> => {
      if (!formValues.email.includes('@')) {
        newFormErrors.email.isError = true;
        newFormErrors.email.message = 'Invalid Email Address';  
      }

      const emailUnique: boolean = await isEmailUnique();
      if (emailUnique) {
        newFormErrors.email.isError = true;
        newFormErrors.email.message = "Account doesn't exist";  
      }

      return !newFormErrors.email.isError;
    }

    const result: boolean = await validateEmail();
    setFormErrors(newFormErrors);

    return result;
  }

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formValuesValid: boolean = await areFormValuesValid();

    if (formValuesValid) {
      try {
        await sendPasswordResetEmail(auth, formValues.email);
        
        setSuccessSnackbarOpen(true);
        setIsEmailSent(true);
      } catch (e) {
        setErrorSnackbarOpen(true);
      }
    }
    
    setIsLoading(false);
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
            <p className={style.text}>
              Don't worry, it happens. Just give us your email and we will reset your password.
            </p> 
          </div>
          <div className={style.right}>
            <div className={style.top}>
              <h2>Forgot Password</h2>
            </div>
            {
              isEmailSent ? 
              <p className={style.text}>
                We have sent an email to <span className={style.email}>{formValues.email}</span>, please check your inbox and follow the instructions. Try logging in again after you reset your password.
              </p>  :
              <form className={style.middle} onSubmit={sendEmail}>
                  <TextField 
                    label="Email"
                    size="small"
                    fullWidth
                    error={formErrors.email.isError}
                    helperText={formErrors.email.message}
                    value={formValues.email}
                    onChange={(e) => setFormValues({...formValues, email: e.target.value})}
                    sx={{
                      height: '56px'
                    }}
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
            }
            <div className={style.bottom}>
              <Link href='/' className={style.loginLink}>
                <h5>Back to Home Page</h5>
              </Link>
            </div>
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
  )
}

export default ForgotPassword;