import style from "./dashboardLayout.module.css";
import { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";

interface Props {
  title?: string;
  children: ReactNode;
}

const DashboardLayout = (props: Props) => {
  const { children, title } = props;

  return ( 
    <div className={style.dashboardLayout}>
      <Sidebar />
      <div className={style.container}>
        <Navbar />
        <div className={style.content}>
          {
            title && 
            <h1 className={style.title}>{title}</h1>
          }
          {children}
        </div>
      </div>
    </div>
   );
}
 
export default DashboardLayout;