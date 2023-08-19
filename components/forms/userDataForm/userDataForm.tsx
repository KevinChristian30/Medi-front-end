"use client"

import React, { useState } from 'react'
import Error from '../../../types/error'
import style from './userDataForm.module.css'
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

interface FormValues {
  firstName: string;
  lastName: string;
  weight?: number;
  height?: number;
  gender: string;
  dateOfBirth: string;
}

interface FormErrors {
  firstName: Error;
  lastName: Error;
  weight: Error;
  height: Error;
  gender: Error;
  dateOfBirth: Error;
}

const Genders = [
  {
    value: '-',
    label: '-'
  },
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  }
];

const UserDataForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    weight: undefined,
    height: undefined,
    gender: '-',
    dateOfBirth: ''
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
    },
    dateOfBirth: {
      isError: false,
      message: ''
    }
  });

  const isFormValid = () : boolean => {
    let localFormErrors : FormErrors = {
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
      },
      dateOfBirth: {
        isError: false,
        message: ''
      }
    }; 
    
    const validateFirstName = () : boolean => {
      if (formValues.firstName.length >= 1 && formValues.firstName.length <= 30) 
        return true;

      localFormErrors.firstName = {
        isError: true,
        message: 'First name\'s length must be between 1 and 30 characters long'
      };
      return false;
    }

    const validateLastName = () : boolean => {
      if (formValues.lastName.length <= 30) return true;

      localFormErrors.lastName = {
        isError: true,
        message: 'Last name\'s length exceeds 30 characters'
      };

      return false;
    }

    const validateWeight = () : boolean => {
      if (formValues.weight && formValues.weight > 0) return true;
      
      localFormErrors.weight = {
        isError: true,
        message: 'Weight must be greater than 0'
      };

      return false;
    }

    const validateHeight = () : boolean => {
      if (formValues.height && formValues.height > 0) return true;
      
      localFormErrors.height = {
        isError: true,
        message: 'Height must be greater than 0'
      };

      return false;
    }

    const validateGender = () : boolean => {
      if (formValues.gender !== '-') return true;

      localFormErrors.gender = {
        isError: true,
        message: 'You must pick a gender'
      };

      return false;
    }

    const validateDateOfBirth = () : boolean => {
      // ToDo: Validate Date of Birth
      
      return false;
    }

    setFormErrors(localFormErrors);

    const isValidFirstName = validateFirstName();
    const isValidLastName = validateLastName();
    const isValidWeight = validateWeight();
    const isValidHeight = validateHeight();
    const isValidGender = validateGender();
    const isValidDateOfBirth = validateDateOfBirth();
    
    return isValidFirstName && 
           isValidLastName &&
           isValidWeight &&
           isValidHeight &&
           isValidGender;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) return;

    // ToDo: Submit the Form
  }

  return (
    <form className={style.dataContainer} onSubmit={handleSubmit}>
      <div className={style.line}>
        <TextField
          label="First Name"
          fullWidth
          value={formValues.firstName}
          onChange={(e) => setFormValues({...formValues, firstName: e.target.value})}
          error={formErrors.firstName.isError}
          helperText={formErrors.firstName.message}
          size='small'
          sx={{
            height: '56px'
          }}
        />
        <TextField 
          label="Last Name"
          fullWidth
          value={formValues.lastName}
          onChange={(e) => setFormValues({...formValues, lastName: e.target.value})}
          error={formErrors.lastName.isError}
          helperText={formErrors.lastName.message}
          size='small'
          sx={{
            height: '56px'
          }}
        />
      </div>
      <div className={style.line}>
        <TextField 
          type='number'
          label="Weight"
          fullWidth
          value={formValues.weight}
          onChange={(e) => setFormValues({...formValues, weight: Number(e.target.value)})}
          error={formErrors.weight.isError}
          helperText={formErrors.weight.message}
          size='small'
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
          fullWidth
          value={formValues.height}
          onChange={(e) => setFormValues({...formValues, height: Number(e.target.value)})}
          error={formErrors.height.isError}
          helperText={formErrors.height.message}
          size='small'
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
          select
          label="Gender"
          defaultValue={Genders[0].value}
          value={formValues.gender}
          fullWidth
          error={formErrors.gender.isError}
          helperText={formErrors.gender.message}
          size='small'
          sx={{
            height: '56px'
          }}
        >
          {
            Genders.map((gender) => (
              <MenuItem 
                key={gender.value}
                value={gender.value} 
                onClick={(e) => setFormValues({...formValues, gender: gender.value})}
              >
                {gender.label}
              </MenuItem>
            ))
          }
        </TextField>
      </div>
      <div className={style.line}>
        <TextField 
          type='date'
          label="Date of Birth"
          fullWidth
          value={formValues.dateOfBirth}
          onChange={(e) => setFormValues({...formValues, dateOfBirth: e.target.value})}
          error={formErrors.dateOfBirth.isError}
          helperText={formErrors.dateOfBirth.message}
          size='small'
          sx={{
            height: '56px'
          }}
          placeholder='Date of Birth'
          InputLabelProps={{
            shrink: true
          }}
        />
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
    </form>
  )
}

export default UserDataForm