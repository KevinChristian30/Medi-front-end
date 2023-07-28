import Logo from "../../../components/logo/logo";
import style from "./sidebar.module.css";

const Sidebar = () => {
  return ( 
    <div className={style.sidebar}>
      <div className={style.top}>
        <Logo />
      </div>
      <div className={style.bottom}>

      </div>
    </div>
   );
}
 
export default Sidebar;