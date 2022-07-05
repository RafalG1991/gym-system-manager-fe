import React from 'react';

import classes from './ErrorMessage.module.css';

export const ErrorMessage = ({
  message = 'Something went wrong. Please try again, or contact our support',
}: {
  message?: string;
}) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>Oops!</p>
      <p>{message}</p>
    </div>
  );
};
