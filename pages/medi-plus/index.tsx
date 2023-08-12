import Head from 'next/head'
import React from 'react'
import style from "./index.module.css"
import MediplusCard, { IMediplusProps } from '../../components/cards/mediplusCard/mediplusCard';
import Link from 'next/link';

const MediPlus = () => {
  const mediplusData : Array<IMediplusProps> = [
    {
      title: 'Brain Tumor Classifier',
      description: 'Classifies wether an MRI/CT scan can lead to cancer.',
      image: 'mri.jpg',
      url: '/medi-plus/brain-tumor-classifier'
    }
  ];

  return (
    <>
      <Head>
        <title>Mediplus</title>
      </Head>
      <div className={style.index}>
        <h1>Mediplus</h1>
        <p>Mediplus is a collection of our experimental AI models, try them out and tell us what you think.</p>
        <div className={style.cardContainer}>
          {
            mediplusData.map((data: IMediplusProps) => {
              return <MediplusCard {...data} />
            })
          }
        </div>
        <Link href={'/dashboard'} className={style.link}>
          Back to Medi
        </Link>
      </div>
    </>
  )
}

export default MediPlus