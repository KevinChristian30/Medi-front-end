import Head from "next/head";
import Authorized from "../../components/gates/Authorized";
import DashboardLayout from "../../layouts/dashboardLayout/dashboardLayout";

const HeartRate = () => {
  return (
    <>
      <Authorized>
        <Head>
          <title>Medi | Heart Rate</title>
        </Head>
        <main>
          <DashboardLayout>
            <h1>Heart Rate</h1>
          </DashboardLayout>
        </main>
      </Authorized>
    </>
  )
}

export default HeartRate;