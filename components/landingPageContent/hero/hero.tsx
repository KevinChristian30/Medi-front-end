import style from "./hero.module.css";
import RoundedButton from "../../utilities/buttons/roundedButton/roundedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return ( 
    <div className={style.index}>
      <div className={style.hero}>
          <FontAwesomeIcon icon={faNotesMedical} className={style.bouncingIcon} />
          <h1>Your At Home Health Analysis, Powered by Artificial Intelligence.</h1>
          <RoundedButton>Try HealthScanAI</RoundedButton>
      </div>
    </div>
   );
}
 
export default Hero;