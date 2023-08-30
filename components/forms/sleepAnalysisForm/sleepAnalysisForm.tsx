import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Modal, Slider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import style from './sleepAnalysisForm.module.css'
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebaseConfig';
import UserDataDTO from '../../../DTO/userDataDTO';
import UserDataController from '../../../controllers/userController';
import Response from '../../../models/utility/Response';
import { calculateBMI, dateToAge, toBMICategory } from '../../../utils';
import Error from '../../../types/error';
import { useRouter } from 'next/router';

interface FormValues {
  gender: string;
  age: number;
  BMICategory: string;
  sleepDuration?: string;
  qualityOfSleep?: number;
  physicalActivity?: number;
  stressLevel?: number;
  upperBloodPressure?: string;
  lowerBloodPressure?: string;
}

interface FormErrors {
  sleepDuration: Error;
  qualityOfSleep: Error; // Subjective Sleep Quality
  physicalActivity: Error; // Minutes a day
  stressLevel: Error; // Subjective Stress Level
  upperBloodPressure: Error; // Diinput User (mm Hg)
  lowerBloodPressure: Error; // Diinput User (mm Hg)
}

const SleepAnalysisForm = () => {
  const userDataController: UserDataController = new UserDataController();
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    gender: '',
    age: 0,
    BMICategory: '',
    sleepDuration: '',
    qualityOfSleep: 5,
    physicalActivity: 0,
    stressLevel: 5,
    lowerBloodPressure: '',
    upperBloodPressure: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    sleepDuration: {
      isError: false,
      message: ''
    },
    qualityOfSleep: {
      isError: false,
      message: ''
    },
    physicalActivity: {
      isError: false,
      message: ''
    },
    stressLevel: {
      isError: false,
      message: ''
    },
    upperBloodPressure: {
      isError: false,
      message: ''
    },
    lowerBloodPressure: {
      isError: false,
      message: ''
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const fetch = async () => {
      let initialFormValues: FormValues = {
        gender: '',
        age: 0,
        BMICategory: '',
        sleepDuration: '',
        qualityOfSleep: 5,
        physicalActivity: 0,
        stressLevel: 5,
        lowerBloodPressure: '',
        upperBloodPressure: '',
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
      } else {
        setOpen(true);
      }

      setFormValues(initialFormValues);
    }
  
    fetch();
  }, []);

  const isFormValid = () : boolean => {
    let localFormErrors: FormErrors = {
      sleepDuration: {
        isError: false,
        message: ''
      },
      qualityOfSleep: {
        isError: false,
        message: ''
      },
      physicalActivity: {
        isError: false,
        message: ''
      },
      stressLevel: {
        isError: false,
        message: ''
      },
      upperBloodPressure: {
        isError: false,
        message: ''
      },
      lowerBloodPressure: {
        isError: false,
        message: ''
      },
    };

    const validateSleepDuration = () => {
      if (Number(formValues.sleepDuration) > 0) return true;

      localFormErrors.sleepDuration = {
        isError: true,
        message: 'Sleep duration must be greater than 0.'
      };

      return false;
    }

    const validateQualityOfSleep = () => {
      if (Number(formValues.qualityOfSleep) >= 1 && Number(formValues.qualityOfSleep) <= 10) return true;

      localFormErrors.qualityOfSleep = {
        isError: true,
        message: 'Quality of sleep must be greater between 1 and 10.'
      };

      return false;
    }

    const validatePhysicalActivity = () => {
      if (Number(formValues.physicalActivity) > -1) return true;

      localFormErrors.physicalActivity = {
        isError: true,
        message: 'Minutes of physical activity musn\'t be negative.'
      };

      return false;
    }

    const validateStressLevel = () => {
      if (Number(formValues.stressLevel) >= 1 && Number(formValues.stressLevel) <= 10) return true;

      localFormErrors.stressLevel = {
        isError: true,
        message: 'Stress level must be greater between 1 and 10.'
      };

      return false;
    }

    const validateLowerBloodPressure = () => {
      if (Number(formValues.lowerBloodPressure) > 0) return true;

      localFormErrors.lowerBloodPressure = {
        isError: true,
        message: 'Lower blood pressure must be greater than 0'
      };

      return false;
    }

    const validateUpperBloodPressure = () => {
      if (Number(formValues.upperBloodPressure) > 0) return true;

      localFormErrors.upperBloodPressure = {
        isError: true,
        message: 'Upper blood pressure must be greater than 0'
      };

      return false;
    }
    
    const isValidSleepDuration = validateSleepDuration();
    const isValidQualityOfSleep = validateQualityOfSleep();
    const isValidPhysicalActivity = validatePhysicalActivity();
    const isValidStressLevel = validateStressLevel();
    const isValidLowerBloodPressure = validateLowerBloodPressure();
    const isValidUpperBloodPressure = validateUpperBloodPressure();
    
    setFormErrors(localFormErrors);

    return isValidSleepDuration &&
           isValidQualityOfSleep &&
           isValidPhysicalActivity &&
           isValidStressLevel &&
           isValidLowerBloodPressure &&
           isValidUpperBloodPressure;
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) return;

    // Todo: Send Data to Backend
  }

  return (
    <div className={style.sleepAnalysisForm}>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          You haven't filled your data
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sleep Analysis needs your data to be accurate, fill your data in my-data page before continuing.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {router.push('/my-data')}} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
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
                variant="outlined"
                fullWidth
              >
                Update Data
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className={style.line}>
          <h3 className={style.title}>Sleep Data</h3>
          <div className={style.dataContainer}>
            <div className={style.line}>
              <TextField 
                type='number'
                placeholder='Average Sleep Duration'
                fullWidth
                value={formValues.sleepDuration}
                onChange={(e) => setFormValues({...formValues, sleepDuration: e.target.value})}
                error={formErrors.sleepDuration.isError}
                helperText={formErrors.sleepDuration.message}
                size='small'
                sx={{
                  height: '56px'
                }}
                InputProps={{
                  "endAdornment": <InputAdornment position="end">Hours</InputAdornment>,
                }}
              />
            </div>
            <div>
              <p>Subjective Quality of Sleep</p>
              <Slider
                aria-label="Quality of Sleep"
                step={1}
                marks
                min={1}
                max={10}
                valueLabelDisplay='auto'
                value={formValues.qualityOfSleep}
                onChange={(_, e) => setFormValues({...formValues, qualityOfSleep: Number(e)})}
              />
            </div>
            <div>
              <p>Subjective Stress Level</p>
              <Slider
                aria-label="Stress Level"
                step={1}
                marks
                min={1}
                max={10}
                valueLabelDisplay='auto'
                value={formValues.stressLevel}
                onChange={(_, e) => setFormValues({...formValues, stressLevel: Number(e)})}
              />
            </div>
            <div className={style.line}>
              <TextField 
                type='number'
                label='Minutes of Physical Activity'
                placeholder='Your minutes of physical activity in a day'
                fullWidth
                value={formValues.physicalActivity}
                onChange={(e) => setFormValues({...formValues, physicalActivity: Number(e.target.value)})}
                error={formErrors.physicalActivity.isError}
                helperText={formErrors.physicalActivity.message}
                size='small'
                sx={{
                  height: '56px'
                }}
              />
            </div>
            <div className={style.line}>
              <TextField 
                type='number'
                label='Blood Pressure (Lower/Diastolic)'
                placeholder='Your systolic blood pressure'
                fullWidth
                value={formValues.lowerBloodPressure}
                onChange={(e) => setFormValues({...formValues, lowerBloodPressure: e.target.value})}
                error={formErrors.lowerBloodPressure.isError}
                helperText={formErrors.lowerBloodPressure.message}
                size='small'
                sx={{
                  height: '56px'
                }}
              />
            </div>
            <div className={style.line}>
              <TextField 
                type='number'
                label='Blood Pressure (Upper/Systolic)'
                placeholder='Your diastolic blood pressure'
                fullWidth
                value={formValues.upperBloodPressure}
                onChange={(e) => setFormValues({...formValues, upperBloodPressure: e.target.value})}
                error={formErrors.upperBloodPressure.isError}
                helperText={formErrors.upperBloodPressure.message}
                size='small'
                sx={{
                  height: '56px'
                }}
              />
            </div>
            <div className={style.line}>
              <Button 
                variant="contained"
                fullWidth
                type='submit'
              >
                Analyze My Sleep
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SleepAnalysisForm