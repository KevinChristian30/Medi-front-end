import { NextPage } from "next";
import Navbar from "../../components/navbar/Navbar";
import style from "./index.module.css";

const Login: NextPage = () => {
  return ( 
    <>
      <Navbar />
      <div className={style.loginPageContent}>
        
      </div>
    </>
   );
}
 
export default Login