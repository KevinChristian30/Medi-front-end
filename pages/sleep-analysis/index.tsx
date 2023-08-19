import Head from "next/head";
import Authorized from "../../components/gates/Authorized";
import DashboardLayout from "../../layouts/dashboardLayout/dashboardLayout";
import SleepAnalysisForm from "../../components/forms/sleepAnalysisForm/sleepAnalysisForm";

const HeartRate = () => {
  return (
    <Authorized>
      <Head>
        <title>Medi | Sleep Analysis</title>
      </Head>
      <main>
        <DashboardLayout 
          title="Sleep Analysis"
        >
          <SleepAnalysisForm />          
        </DashboardLayout>
      </main>
    </Authorized>
  )
}

export default HeartRate;