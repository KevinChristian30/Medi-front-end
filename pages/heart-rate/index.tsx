import Head from "next/head";
import Authorized from "../../components/gates/Authorized";
import DashboardLayout from "../../layouts/dashboardLayout/dashboardLayout";
import { LoadingButton } from "@mui/lab";

const HeartRate = () => {
  return (
    <Authorized>
      <Head>
        <title>Medi | Heart Rate</title>
      </Head>
      <main>
        <DashboardLayout 
          title="Heart Rate"
        >
          <p>Using the power of AI, we can get your heart rate with a 15 second video of your forehead.</p>
          <input type="file" />
          <LoadingButton
            variant="outlined"
          >
            Submit
          </LoadingButton>
        </DashboardLayout>
      </main>
    </Authorized>
  )
}

export default HeartRate;