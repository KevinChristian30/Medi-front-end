import Link from "next/link";
import Logo from "../logo/Logo";
import style from "./navbar.module.css";

const Navbar = () => {
  return ( 
    <div className={style.navbar}>
      <div className={style.left}>
        <Link href="/"><Logo /></Link>
      </div>
      <ul className={style.right}>
        <li><Link href="login" className={style.navbarLink}>Login</Link></li>
      </ul>
    </div>
   );
}
 
export default Navbar;