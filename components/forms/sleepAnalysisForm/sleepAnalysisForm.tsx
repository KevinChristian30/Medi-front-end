import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import style from './sleepAnalysisForm.module.css'
import Link from 'next/link';

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
  const [formValues, setFormValues] = useState<FormValues>({
    gender: 'Female',
    age: 20,
    BMICategory: 'Obese',
    sleepDuration: 0,
    qualityOfSleep: 0,
    physicalActivity: 0,
    stressLevel: 1,
    bloodPressure: 0
  });

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