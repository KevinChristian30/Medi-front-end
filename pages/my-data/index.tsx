import React from 'react'
import Authorized from '../../components/gates/Authorized'
import Head from 'next/head'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import Error from '../../types/error';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import style from "./index.module.css";
import InputAdornment from '@mui/material/InputAdornment';
import Gender from '../../enums/Gender';
import MenuItem from '@mui/material/MenuItem';

interface FormValues {
  firstName: string;
  lastName: string;
  weight: string;
  height: string;
  gender?: Gender;
}

interface FormErrors {
  firstName: Error;
  lastName: Error;
  weight: Error;
  height: Error;
  gender: Error;
}

const Genders = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  }
];

const MyData = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    weight: '',
    height: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    firstName: {
      isError: false,
      message: ''
    },
    lastName: {
      isError: false,
      message: ''
    },
    weight: {
      isError: false,
      message: ''
    },
    height: {
      isError: false,
      message: ''
    },
    gender: {
      isError: false,
      message: ''
    }
  });

  return (
    <>
      <Authorized>
        <Head>
          <title>Medi | My Data</title>
        </Head>
        <main>
          <DashboardLayout>
            <h1>My Data</h1>
            <div className={style.dataContainer}>
              <div className={style.line}>
                <TextField 
                  label="First Name"
                  size="small"
                  fullWidth
                  value={formValues.firstName}
                  onChange={(e) => setFormValues({...formValues, firstName: e.target.value})}
                  error={formErrors.firstName.isError}
                  helperText={formErrors.firstName.message}
                  sx={{
                    height: '56px'
                  }}
                />
                <TextField 
                  label="Last Name"
                  size="small"
                  fullWidth
                  value={formValues.lastName}
                  onChange={(e) => setFormValues({...formValues, lastName: e.target.value})}
                  error={formErrors.lastName.isError}
                  helperText={formErrors.lastName.message}
                  sx={{
                    height: '56px'
                  }}
                />
              </div>
              <div className={style.line}>
                <TextField 
                  type='number'
                  label="Weight"
                  size="small"
                  fullWidth
                  value={formValues.weight}
                  onChange={(e) => setFormValues({...formValues, weight: e.target.value})}
                  error={formErrors.weight.isError}
                  helperText={formErrors.weight.message}
                  sx={{
                    height: '56px'
                  }}
                  InputProps={{
                    "endAdornment": <InputAdornment position="end">kg</InputAdornment>,
                  }}
                />
                <TextField 
                  type='number'
                  label="Height"
                  size="small"
                  fullWidth
                  value={formValues.height}
                  onChange={(e) => setFormValues({...formValues, height: e.target.value})}
                  error={formErrors.height.isError}
                  helperText={formErrors.height.message}
                  sx={{
                    height: '56px'
                  }}
                  InputProps={{
                    "endAdornment": <InputAdornment position="end">cm</InputAdornment>,
                  }}
                />
              </div>
              <div className={style.line}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Gender"
                  defaultValue="EUR"
                  size='small'
                  fullWidth
                  error={formErrors.gender.isError}
                  helperText={formErrors.gender.message}
                >
                  {
                    Genders.map((gender) => (
                      <MenuItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </div>
              <LoadingButton 
                type="submit"
                variant="contained" 
                fullWidth
                loading={false}
                startIcon={<SaveIcon></SaveIcon>}
                >
                Save
              </LoadingButton>
            </div>
          </DashboardLayout>
        </main>
      </Authorized>
    </>
  )
}

export default MyData