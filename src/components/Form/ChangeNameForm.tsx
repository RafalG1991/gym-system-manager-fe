import React, {FormEvent, useContext } from 'react';
import {Button} from "../utilities/Button/Button";
import {Input} from "../Input/Input";
import {useForm} from "../../hooks/use-form";
import {AuthContext} from "../../providers/AuthProvider";
import {Loader} from "../utilities/Loader/Loader";

import classes from './Form.module.css';
import {UserDataContext} from "../../providers/UserDataProvider";

export const ChangeNameForm = () => {
  const {user} = useContext(AuthContext);
  const {userData, changeName, idName, isLoading, setIdName} = useContext(UserDataContext);

  const {
    value: firstNameValue,
    valueInputHandler: firstNameInputHandler,
    valueBlurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
    isValid: isFirstNameValid,
    setValue: setFirstName,
  } = useForm(value => value.trim() !== '');

  const {
    value: lastNameValue,
    valueInputHandler: lastNameInputHandler,
    valueBlurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
    isValid: isLastNameValid,
    setValue: setLastName,
  } = useForm(value => value.trim() !== '');

  if (!userData) {
    return <>
      <Loader />
      <p>Loading Data Error</p>
    </>
  }

  let isFormValid = false;

  if(isFirstNameValid && isLastNameValid && (firstNameValue !== userData.firstname || lastNameValue !== userData.lastname)) {
    isFormValid = true;
  }

  if(!firstNameValue && !lastNameValue && userData.firstname && userData.lastname) {
    setFirstName(userData.firstname);
    setLastName(userData.lastname);
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if(!isFormValid || !user) return;
    await changeName(firstNameValue, lastNameValue);
  }

  const reloadInputData = () => {
    setIdName('');
  }

  if(isLoading) {
    return <Loader />
  }

  return (
    <form className={classes.wrapper} onSubmit={submitHandler}>
      {idName ? <div className={classes.updateinfo}>
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