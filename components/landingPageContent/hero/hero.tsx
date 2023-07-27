import style from "./hero.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

const Hero = () => {
  return ( 
    <div className={style.index}>
      <div className={style.hero}>
          <FontAwesomeIcon icon={faNotesMedical} className={style.bouncingIcon} />
          <h1>Your At Home Health Analysis, Powered by Artificial Intelligence.</h1>
          <Button variant="contained">
            Try Now
          </Button>
      </div>
    </div>
   );
}
 
export default Hero;