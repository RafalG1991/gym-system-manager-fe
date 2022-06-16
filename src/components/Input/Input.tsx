import React, {ChangeEvent} from 'react';

import classes from './Input.module.css';

interface Props {
  children: React.ReactNode;
  textarea?: boolean;
  type?: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  value: string;
  hasError: boolean;
  errMsg: string;
}

export const Input = ({children, textarea = false, type = 'text', id, onChange, onBlur, value, hasError, errMsg}: Props) => {
  return (
    <label className={hasError ? classes.wrapperError : classes.wrapper}>
      {children}:
      {textarea
        ?  <textarea
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        : <input
            type={type}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />}
      {hasError && <p className={classes.error}>{errMsg}</p>}
    </label>
  )
}