import { MouseEventHandler } from "react";
import style from "./roundedButton.module.css";

interface Props {
  children?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const RoundedButton = (props: Props) => {
  const { children, onClick } = props;

  return ( 
    <div className={style.roundedButton} onClick={onClick}>
      <p className={style.text}>{children}</p>
    </div>
   );
}
 
export default RoundedButton;