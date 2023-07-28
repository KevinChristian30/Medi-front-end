import { NextPage } from "next";
import Head from "next/head";
import style from "./index.module.css";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "next/image";
import registerBackgroundImage from "/public/register-image.jpg"
import registerIllustration from "/public/register-illustration.svg"
import { useState } from "react";
import Error from "../../types/error";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email: Error;
  password: Error;
}

const Register: NextPage = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: {
      isError: false,
      message: ''
    },
    password: {
      isError: false,
      message: ''
    }
  });

  const areFormValuesValid = () : boolean => {
    let newFormError: FormErrors = {
      email: {
        isError: false,
        message: ''
      },
      password: {
        isError: false,
        message: ''
      }
    };

    const validateEmail = () : boolean => {
      const regExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const isEmailValid: boolean = regExp.test(formValues.email);

      if (!isEmailValid) {
        newFormError.email.isError = true;
        newFormError.email.message = 'Invalid Email Address';        
      }

      return isEmailValid;
    }

    const validatePassword = () : boolean => {
      const lowercaseLetterRegExp: RegExp = /^(?=.*[a-z]).*$/;
      const uppercaseLetterRegExp: RegExp = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
      const numberRegExp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/;

      let isPasswordValid: boolean = lowercaseLetterRegExp.test(formValues.password);
      if (!isPasswordValid) {
        newFormError.password.isError = true;
        newFormError.password.message = 'Password must contain lowercase letter';        
        return false;
      }

      isPasswordValid = uppercaseLetterRegExp.test(formValues.password);
      if (!isPasswordValid) {
        newFormError.password.isError = true;
        newFormError.password.message = 'Password must contain uppercase letter';      
        return false;  
      }
      
      isPasswordValid = numberRegExp.test(formValues.password);
      if (!isPasswordValid) {
        newFormError.password.isError = true;
        newFormError.password.message = 'Password must contain number';        
        return false;
      }

      isPasswordValid = formValues.password.length >= 8;
      if (!isPasswordValid) {
        newFormError.password.isError = true;
        newFormError.password.message = 'Password must be at least 8 characters long';        
        return false;
      }

      return true;
    }

    const isValidEmail: boolean = validateEmail();
    const isValidPassword: boolean = validatePassword();

    setFormErrors(newFormError);

    return isValidEmail && isValidPassword;
  }

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (areFormValuesValid()) {
      // Send Request 
    }
  }

  return ( 
    <>
      <Head>
        <title>MedBotAI | Register</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className={style.index}>
        <Image 
          src={registerBackgroundImage}
          className={style.backgroundImage}
          alt="Happy and Healthy"
        />
        <div className={style.filter}></div>
        <div className={style.content}>
          <div className={style.left}>
            <Image 
              src={registerIllustration}
              className={style.illustration}
              alt="Doctors"
            />
            <p>
              Revolutionizing personalized healthcare with the power of Artificial Intelligence.
            </p>
          </div>
          <div className={style.right}>
            <div className={style.top}>
              <h2>Get Started</h2>
            </div>
            <form className={style.middle} onSubmit={register}>
              <TextField 
                label="Email"
                size="small"
                fullWidth
                value={formValues.email}
                onChange={(e) => setFormValues({...formValues, email: e.target.value})}
                error={formErrors.email.isError}
                helperText={formErrors.email.message}
                sx={{
                  height: '56px'
                }}
              />
              <TextField 
                type="password"
                label="Password"
                size="small"
                fullWidth
                value={formValues.password}
                onChange={(e) => setFormValues({...formValues, password: e.target.value})}
                error={formErrors.password.isError}
                helperText={formErrors.password.message}
                sx={{
                  height: '56px'
                }}
              />
              <Button 
                type="submit"
                variant="contained" 
                fullWidth>
                Register for Free
              </Button>
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
   );
}
 
export default Register;