import { ReactNode } from 'react'
import style from "./mediplus.module.css"
import Head from 'next/head';

interface Props {
  title: string;
  children: ReactNode;
}

const MediplusLayout = (props: Props) => {
  const { title, children } = props;
  
  return (
    <>
      <Head>
        <title>Medi+</title>
      </Head>
      <div className={style.mediplusLayout}>
        <h1>{title}</h1>
        <div className={style.contentContainer}>
          {children}
        </div>
      </div>
    </>
  )
}

export default MediplusLayout