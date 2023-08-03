import Head from "next/head";
import style from "./index.module.css";
import DashboardLayout from "../../layouts/dashboardLayout/dashboardLayout";
import Authorized from "../../components/gates/Authorized";

const Dashboard = () => {
  return ( 
    <>
      <Authorized>
        <Head>
          <title>Medi | Dashboard</title>
        </Head>
        <main>
          <DashboardLayout
            title="Dashboard"
          >
          </DashboardLayout>
        </main>
      </Authorized>
    </>
  );
}
 
export default Dashboard;