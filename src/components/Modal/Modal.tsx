import React from 'react';

import classes from './Modal.module.css';

export const Modal = ({children}: {children: React.ReactNode}) => {
  return <div className={classes.modalWrapper}>
    <div className={classes.modal}>
      {children}
    </div>
  </div>
}