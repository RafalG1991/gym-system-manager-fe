import React from 'react';

import classes from './Bmi.module.css';

interface Props {
  bmi: string;
}

export const Bmi = ({bmi}: Props) => {
  let gradeColor;
  switch (true) {
    case Number(bmi) >= 30 || Number(bmi) < 17:
      gradeColor = '#ed4a4a';
      break;
    case (Number(bmi) >= 24.99 && Number(bmi) < 30) || (Number(bmi) >= 17 && Number(bmi) < 18.5) :
      gradeColor = '#f3d22b';
      break;
    case Number(bmi) >= 18.5 && Number(bmi) < 24.99:
      gradeColor = '#2adf14';
      break;
    default:
      gradeColor = '#9d9d9d';
  }

  return <div
      className={classes.grade}
      style={{ backgroundColor: gradeColor }}
      data-testid="bmiGrade-element"
    >
      {bmi}
    </div>
};
