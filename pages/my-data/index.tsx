import React from 'react'
import Authorized from '../../components/gates/Authorized'
import Head from 'next/head'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import UserDataForm, { UserDataFormProps } from '../../components/forms/userDataForm/userDataForm';
import { GetServerSideProps } from 'next';
import { auth } from '../../firebase/firebaseConfig';

const MyData = (props: UserDataFormProps) => {
  const { initialFormValues } = props;

  return (
    <>
      <Authorized>
        <Head>
          <title>Medi | My Data</title>
        </Head>
        <div>
          <DashboardLayout title='My Data'>
            <UserDataForm initialFormValues={initialFormValues} />
          </DashboardLayout>
        </div>
      </Authorized>
    </>
  )
}

export const getServerSideProps : GetServerSideProps = async () => {
  // Todo: Get Initial Form Values with Controller
  // const userData = ;

  return {
    props: {
    }
  }
}


export default MyData