import React from 'react';

import classes from './SingleClass.module.css';

interface Props {
  eventId: string;
}

export const SingleClass = ({eventId}: Props) => {

  return <div className={classes.wrapper}>
    <h1>Single class ID: {eventId}</h1>
  </div>
}