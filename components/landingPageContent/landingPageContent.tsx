import style from "./landingPageContent.module.css";
import Hero from "./hero/hero";

const LandingPageContent = () => {
  return ( 
    <div className={style.landingPageContent}>
      <Hero />
    </div>
   );
}
 
export default LandingPageContent;