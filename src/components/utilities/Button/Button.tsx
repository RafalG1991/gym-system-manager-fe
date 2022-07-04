import React from 'react';

import classes from './Button.module.css';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (() => void) | (() => Promise<void>);
}

export const Button = ({children, disabled=false, onClick}: Props) => {

  return <button onClick={onClick} disabled={disabled} className={disabled ? classes.btnDisabled : classes.btn}>{children}</button>
}