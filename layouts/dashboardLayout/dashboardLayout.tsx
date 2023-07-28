import style from "./dashboardLayout.module.css";
import { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";

interface Props {
  children: ReactNode;
}

const DashboardLayout = (props: Props) => {
  const { children } = props;

  return ( 
    <div className={style.dashboardLayout}>
      <Sidebar />
      <div className={style.container}>
        <Navbar />
        {children}
      </div>
    </div>
   );
}
 
export default DashboardLayout;