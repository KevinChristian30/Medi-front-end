import React from 'react'
import Authorized from '../../components/gates/Authorized'
import Head from 'next/head'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import UserDataForm from '../../components/forms/userDataForm/userDataForm';

const MyData = () => {
  return (
    <>
      <Authorized>
        <Head>
          <title>Medi | My Data</title>
        </Head>
        <div>
          <DashboardLayout title='My Data'>
            <UserDataForm />
          </DashboardLayout>
        </div>
      </Authorized>
    </>
  )
}

export default MyData