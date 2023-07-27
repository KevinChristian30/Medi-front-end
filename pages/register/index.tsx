import { NextPage } from "next";
import Head from "next/head";
import style from "./index.module.css";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "next/image";
import registerBackgroundImage from "/public/register-image.jpg"

const Register: NextPage = () => {
  const register = async () => {

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
          <div className={style.top}>
            <h2>Register</h2>
          </div>
          <div className={style.middle}>
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
            variant="contained" 
            onClick={register}
            fullWidth>
            Register for Free
          </Button>
          </div>
          <div className={style.bottom}>
            <Link href='/' className={style.loginLink}>
              <h5>Back to Home Page</h5>
            </Link>
          </div>
        </div>
      </main>
    </>
   );
}
 
export default Register;