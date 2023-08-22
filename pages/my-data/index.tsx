import React, { useEffect, useState } from 'react'
import Authorized from '../../components/gates/Authorized'
import Head from 'next/head'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import UserDataForm, { FormValues } from '../../components/forms/userDataForm/userDataForm';
import { auth } from '../../firebase/firebaseConfig';
import Response from '../../models/utility/Response';
import UserDataDTO from '../../DTO/userDataDTO';
import UserDataController from '../../controllers/userController';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingScreen from '../../components/loading/loadingScreen';

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