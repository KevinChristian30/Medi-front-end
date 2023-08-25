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
          <p>
            Sleep Analysis is Medi's way of helping you take control of your sleep. Fill the form below and we will analyze your sleep quality.
          </p>
          <div style={{height: '48px'}}></div>
          <SleepAnalysisForm />          
        </DashboardLayout>
      </main>
    </Authorized>
  )
}

export default HeartRate;