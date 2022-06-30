import React, {FormEvent, useContext, useState} from 'react';
import {Button} from "../utilities/Button/Button";
import {Input} from "../Input/Input";

import classes from './Form.module.css';
import {useForm} from "../../hooks/use-form";
import {AuthContext} from "../../providers/AuthProvider";
import {Modal} from "../Modal/Modal";
import {Loader} from "../utilities/Loader/Loader";

interface optionalInitialValues {
  firstName?: string;
  lastName?: string;
}

export const Form = ({firstName, lastName}: optionalInitialValues) => {
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

  if(isFirstNameValid && isLastNameValid) {
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

  if(isLoading) {
    return <Loader />
  }

  return (
    <form className={classes.wrapper} onSubmit={submitHandler}>
      {id ? <div className={classes.inputs}>
        <p>Your data has successfully been changed!</p>
        <Button onClick={() => setId('')}>Change again!</Button>
      </div> : <>
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
        <Button disabled={!isFormValid}>Submit</Button>
      </>
      }
    </form>
  )
};