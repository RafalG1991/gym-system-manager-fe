import React, {FormEvent, useContext, useState} from 'react';
import {Button} from "../utilities/Button/Button";
import {Input} from "../Input/Input";
import {useForm} from "../../hooks/use-form";
import {AuthContext} from "../../providers/AuthProvider";
import {Loader} from "../utilities/Loader/Loader";

import classes from './Form.module.css';

interface optionalInitialValues {
  firstName?: string;
  lastName?: string;
  triggerReload: (id: string) => void;
}

export const ChangeNameForm = ({firstName, lastName, triggerReload}: optionalInitialValues) => {
  const {user} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [id, setId] = useState('');

  const {
    value: firstNameValue,
    valueInputHandler: firstNameInputHandler,
    valueBlurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
    isValid: isFirstNameValid,
    valueReset: firstNameReset,
    setValue: setFirstName,
  } = useForm(value => value.trim() !== '');

  const {
    value: lastNameValue,
    valueInputHandler: lastNameInputHandler,
    valueBlurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
    isValid: isLastNameValid,
    valueReset: lastNameReset,
    setValue: setLastName,
  } = useForm(value => value.trim() !== '');

  let isFormValid = false;

  if(isFirstNameValid && isLastNameValid && (firstNameValue !== firstName || lastNameValue !== lastName)) {
    isFormValid = true;
  }

  if(!firstNameValue && !lastNameValue && firstName && lastName) {
    setFirstName(firstName);
    setLastName(lastName);
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if(!isFormValid || !user) return;
    setIsLoading(true);
    try {
      const res = await fetch('/user', {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'origin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstNameValue,
          lastname: lastNameValue,
        }),
      });
      setId(await res.json());
    } finally {
      setIsLoading(false);
    }
    firstNameReset();
    lastNameReset();
  }

  const reloadInputData = () => {
    triggerReload(id);
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
        <h3>Change your name:</h3>
        <div className={classes.inputs}>
          <Input
            id='firstName'
            onChange={firstNameInputHandler}
            onBlur={firstNameBlurHandler}
            value={firstNameValue}
            hasError={firstNameHasError}
            errMsg={'First name must not be empty and maximum length is 50 characters'}
          >First name</Input>
          <Input
            id='lastName'
            onChange={lastNameInputHandler}
            onBlur={lastNameBlurHandler}
            value={lastNameValue}
            hasError={lastNameHasError}
            errMsg={'Last name must not be empty and maximum length is 50 characters'}
          >Last name</Input>
        </div>
        <Button disabled={!isFormValid}>Change name</Button>
      </>
      }
    </form>
  )
};