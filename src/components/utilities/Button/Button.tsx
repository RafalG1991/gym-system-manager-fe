import React from 'react';

import classes from './Button.module.css';

interface Props {
  children: React.ReactNode,
  disabled?: boolean,
}

export const Button = ({children, disabled=false}: Props) => {

  return <button disabled={disabled} className={disabled ? classes.btnDisabled : classes.btn}>{children}</button>
}