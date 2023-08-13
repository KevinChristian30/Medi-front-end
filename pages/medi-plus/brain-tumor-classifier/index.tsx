import React from 'react'
import MediplusLayout from '../../../layouts/mediplusLayout/mediplusLayout'
import { LoadingButton } from '@mui/lab'
import { useState } from "react";
import useRequest from '../../../hooks/useRequest';
import Response from '../../../models/utility/Response';
import Error from '../../../types/error';
import Image from 'next/image';

interface FormValues {
  image: File | null;
  imagePreviewURL: string | null;
}

interface FormErrors {
  image: Error;
}

const BrainTumorClassifier = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    image: null,
    imagePreviewURL: null
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    image: {
      isError: false,
      message: ''
    }
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response: Response<string> = await useRequest({
      url: `${backendURL}/medi-plus/brain-tumor-classifier`,
      method: 'POST',
      data: formValues
    });
    
    console.log(response);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setFormValues({...formValues, image: files[0]});

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues({...formValues, imagePreviewURL: reader.result as string});
      };

      reader.readAsDataURL(files[0]);
    }
  }
  
  return (
    <div>
      <MediplusLayout
        title='Brain Tumor Classifier'
      >
        <form onSubmit={handleFormSubmit}>
          <input type="file" onChange={handleImageChange} />
          <LoadingButton 
            type="submit"
            variant="outlined" 
            loading={isLoading}
            >
            Classify
          </LoadingButton>
          {
            formValues.imagePreviewURL &&
            <Image
              src={formValues.imagePreviewURL}
              alt='Brain Tumor'
              width={200}
              height={100}
            />
          }
        </form>
      </MediplusLayout>
    </div>
  )
}

export default BrainTumorClassifier