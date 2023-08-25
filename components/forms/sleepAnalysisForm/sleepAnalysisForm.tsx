import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import style from './sleepAnalysisForm.module.css'
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebaseConfig';
import UserDataDTO from '../../../DTO/userDataDTO';
import UserDataController from '../../../controllers/userController';
import Response from '../../../models/utility/Response';
import { calculateBMI, dateToAge, toBMICategory } from '../../../utils';

interface FormValues {
  gender: string;
  age: number;
  BMICategory: string;
  sleepDuration: number;
  qualityOfSleep: number;
  physicalActivity: number;
  stressLevel: number;
  bloodPressure: number;
}

interface FormErrors {
}

const SleepAnalysisForm = () => {
  const userDataController: UserDataController = new UserDataController();

  const [formValues, setFormValues] = useState<FormValues>({
    gender: '',
    age: 0,
    BMICategory: '',
    sleepDuration: 0,
    qualityOfSleep: 0,
    physicalActivity: 0,
    stressLevel: 1,
    bloodPressure: 0
  });

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const fetch = async () => {
      let initialFormValues: FormValues = {
        gender: '',
        age: 0,
        BMICategory: '',
        sleepDuration: 0,
        qualityOfSleep: 0,
        physicalActivity: 0,
        stressLevel: 1,
        bloodPressure: 0
      };

      if (!user) {
        setFormValues(initialFormValues);
        return;
      }

      const response: Response<UserDataDTO> = await userDataController.findByUID(user.uid);
      const userData = response.payload;

      if (userData) {
        initialFormValues = {
          ...initialFormValues,
          gender: userData.gender,
          age: dateToAge(new Date(userData.dateOfBirth)),
          BMICategory: toBMICategory(calculateBMI(userData.weight, userData.height))
        }
      }

      setFormValues(initialFormValues);
    }
  
    fetch();
  }, []);

  return (
    <div className={style.sleepAnalysisForm}>
      <div className={style.userData}>
        <h3 className={style.title}>Your Data</h3>
        <div className={style.dataContainer}>
          <div className={style.line}>
            <TextField
              disabled
              label="Gender"
              fullWidth
              value={formValues.gender}
              size='small'
            />
            <TextField
              disabled
              label="Age"
              fullWidth
              value={formValues.age}
              size='small'
            />
            <TextField
              disabled
              label="BMI Category"
              fullWidth
              value={formValues.BMICategory}
              size='small'
            />
          </div>
          <div className={style.line}>
            <Link href='/my-data' className={style.navButton}>
              <Button 
                variant="contained"
                fullWidth
              >
                Update Data
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <form>
        <div className={style.line}>
          <h3 className={style.title}>Sleep Data</h3>
          <div className={style.dataContainer}>

          </div>
        </div>
      </form>
    </div>
  )
}

export default SleepAnalysisForm