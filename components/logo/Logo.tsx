import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import style from "./logo.module.css";

const Logo = () => {
  return ( 
    <div className={style.logo}>
      <FontAwesomeIcon icon={faNotesMedical} size="xl" className={style.bouncingIcon} />
      <h3>HealthScanAI</h3>
    </div>
   );
}
 
export default Logo;