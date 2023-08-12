import React from 'react'
import MediplusLayout from '../../../layouts/mediplusLayout/mediplusLayout'
import { LoadingButton } from '@mui/lab'
import { useState } from "react";
import useRequest from '../../../hooks/useRequest';
import Response from '../../../models/utility/Response';
import Error from '../../../types/error';

interface FormValues {
  image: any;
}

interface FormErrors {
  image: Error;
}

const BrainTumorClassifier = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response: Response<string> = await useRequest({
      url: backendURL,
      method: 'POST'
    });
  }
  
  return (
    <div>
      <MediplusLayout
        title='Brain Tumor Classifier'
      >
        <form onSubmit={handleFormSubmit}>
          <input type="file" />
          <LoadingButton 
            type="submit"
            variant="outlined" 
            loading={isLoading}
            >
            Classify
          </LoadingButton>
        </form>
      </MediplusLayout>
    </div>
  )
}

export default BrainTumorClassifier