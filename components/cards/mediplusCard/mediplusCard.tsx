import React from 'react'
import style from './mediplusCard.module.css'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/router';

export interface IMediplusProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const MediplusCard = (props: IMediplusProps) => {
  const { title, description, image, url } = props;

  const router = useRouter();

  return (
    <Card 
      sx={{ 
        width: 280 ,
      }}
    >
      <CardActionArea onClick={() => router.push(url)}>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={image}
        />
        <CardContent className={style.cardContent}>
          <h3 className={style.title}>{title}</h3>
          <h4 className={style.description}>{description}</h4>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MediplusCard;