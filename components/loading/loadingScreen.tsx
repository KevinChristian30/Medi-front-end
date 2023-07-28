import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./loadingScreen.module.css";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";

const LoadingScreen = () => {

  return ( 
    <div className={style.loadingScreen}>
      <FontAwesomeIcon icon={faNotesMedical} className={style.icon} beatFade />
    </div>
   );
}
 
export default LoadingScreen;