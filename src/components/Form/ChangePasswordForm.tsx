import React, {FormEvent, useContext, useState} from 'react';
import {Button} from "../utilities/Button/Button";
import {Input} from "../Input/Input";
import {useForm} from "../../hooks/use-form";
import {AuthContext} from "../../providers/AuthProvider";
import {Loader} from "../utilities/Loader/Loader";
import {useError} from "../../hooks/use-error";


import classes from './Form.module.css';

export const ChangePasswordForm = () => {
  const {user} = useContext(AuthContext);
  const {dispatchError} = useError();
  const [isLoading,setIsLoading] = useState(false);
  const [id, setId] = useState('');

  const {
    value: passwordValue,
    valueInputHandler: passwordInputHandler,
    valueBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValid: isPasswordValid,
    valueReset: passwordReset,
  } = useForm(value => value.trim().length > 8);

  const {
    value: confirmPasswordValue,
    valueInputHandler: confirmPasswordInputHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    hasError: confirmPasswordHasError,
    isValid: isConfirmPasswordValid,
    valueReset: confirmPasswordReset,
  } = useForm(value => value === passwordValue);

  let isFormValid = false;

  if(isPasswordValid && isConfirmPasswordValid) {
    isFormValid = true;
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if(!isFormValid || !user) return;
    setIsLoading(true);
    try {
      const res = await fetch('api/user', {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'origin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: passwordValue,
        }),
      });
      const resp = await res.json();
      if (res.ok) {
        setId(resp);
      } else {
        dispatchError('Error occurred, password has not been changed!');
      }
    } catch(e) {
      dispatchError();
    } finally {
      setIsLoading(false);
    }
    passwordReset();
    confirmPasswordReset();
  }

  const reloadInputData = () => {
    setId('');
  }

  if(isLoading) {
    return <Loader />
  }

  return (
    <form className={classes.wrapper} onSubmit={submitHandler}>
      {id ? <div className={classes.updateinfo}>
        <p>Your data has successfully been changed!</p>
        <Button onClick={reloadInputData}>Change again!</Button>
      </div> : <>
        <h3>Change your password:</h3>
        <div className={classes.inputs}>
          <Input
            id='password'
            type='password'
            value={passwordValue}
            onBlur={passwordBlurHandler}
            onChange={passwordInputHandler}
            hasError={passwordHasError}
            errMsg={'Password must be at least 8 characters'}
          >
            Password
          </Input>
          <Input
            id='confirmPassword'
            type='password'
            value={confirmPasswordValue}
            onBlur={confirmPasswordBlurHandler}
            onChange={confirmPasswordInputHandler}
            hasError={confirmPasswordHasError}
            errMsg={'The password confirmation must match entered password.'}
          >
              Confirm Password
          </Input>
        </div>
        <Button disabled={!isFormValid}>Change password</Button>
      </>
      }
    </form>
  )
};