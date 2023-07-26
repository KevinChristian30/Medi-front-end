import { Link } from "@mui/material";
import Logo from "../logo/Logo";
import style from "./navbar.module.css";
import Button from "@mui/material/Button";
import RoundedButton from "../utilities/buttons/roundedButton/roundedButton";

const Navbar = () => {
  return ( 
    <div className={style.navbar}>
      <div className={style.left}>
        <Logo />
      </div>
      <ul className={style.middle}>
      </ul>
      <div className={style.right}>
        Login
      </div>
    </div>
   );
}
 
export default Navbar;