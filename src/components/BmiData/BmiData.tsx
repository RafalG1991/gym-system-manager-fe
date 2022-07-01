import React from 'react';
import {Bmi} from "../Bmi/Bmi";
import { UserDataResponse } from 'types';

import classes from "./BmiData.module.css";

interface Props {
  user: UserDataResponse;
}

export const BmiData = ({user}: Props) => {

  const calculateBMI = (height: number, weight: number) => {
    return (Math.round((weight/(height*height*0.0001))*100)/100).toFixed(2);
  }

  return <>
    <h3>BMI data</h3>
    <div className={classes.bio}>
      <Bmi bmi={calculateBMI(Number(user.height), Number(user.weight))}/>
      <div className={classes.data}>
        <p><span>Height:</span>{user.height ? user.height+' cm' : 'provide your height'}</p>
        <p><span>Weight:</span>{user.weight ? user.weight+' kg' : 'provide your weight'}</p>
      </div>
    </div>
  </>
}