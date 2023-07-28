import Head from "next/head";
import style from "./index.module.css";
import DashboardLayout from "../../layouts/dashboardLayout/dashboardLayout";

const Dashboard = () => {
  return ( 
    <>
      <Head>
        <title>MedbotAI | Dashboard</title>
      </Head>
      <main>
        <DashboardLayout>
          <h1>Dashboard</h1>
        </DashboardLayout>
      </main>
    </>
  );
}
 
export default Dashboard;