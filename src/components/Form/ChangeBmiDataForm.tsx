import React, {FormEvent, useContext, useState} from 'react';
import {Button} from "../utilities/Button/Button";
import {Input} from "../Input/Input";
import {useForm} from "../../hooks/use-form";
import {AuthContext} from "../../providers/AuthProvider";
import {Loader} from "../utilities/Loader/Loader";

import classes from './Form.module.css';
import {UserDataContext} from "../../providers/UserDataProvider";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

export const ChangeBmiDataForm = () => {
  const {user} = useContext(AuthContext);
  const {userData, changeBmi, idBmi, isLoading, setIdBmi} = useContext(UserDataContext);

  const {
    value: heightValue,
    valueInputHandler: heightInputHandler,
    valueBlurHandler: heightBlurHandler,
    hasError: heightHasError,
    isValid: isHeightValid,
    setValue: setHeight,
  } = useForm(value => value.trim().length !== 0 && Number(value) > 0 && Number(value) < 300);

  const {
    value: weightValue,
    valueInputHandler: weightInputHandler,
    valueBlurHandler: weightBlurHandler,
    hasError: weightHasError,
    isValid: isWeightValid,
    setValue: setWeight,
  } = useForm(value => value.trim().length !== 0 && Number(value) > 0 && Number(value) < 999);

  if (!userData) {
    return <ErrorMessage />
  }

  let isFormValid = false;

  if(isHeightValid && isWeightValid && (heightValue !== userData.height || weightValue !== userData.weight)) {
    isFormValid = true;
  }

  if(!heightValue && !weightValue && userData.height && userData.weight) {
    setHeight(userData.height);
    setWeight(userData.weight);
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if(!isFormValid || !user) return;
    await changeBmi(heightValue, weightValue);
  }

  const reloadInputData = () => {
    setIdBmi('');
  }

  if(isLoading) {
    return <Loader />
  }

  return (
    <form className={classes.wrapper} onSubmit={submitHandler}>
      {idBmi ? <div className={classes.updateinfo}>
        <p>Your data has successfully been changed!</p>
        <Button onClick={reloadInputData}>Change again!</Button>
      </div> : <>
        <h3>Change your BMI data:</h3>
        <div className={classes.inputs}>
          <Input
            id='height'
            onChange={heightInputHandler}
            onBlur={heightBlurHandler}
            value={heightValue}
            hasError={heightHasError}
            errMsg={'Provide valid height'}
          >Height</Input>
          <Input
            id='weight'
            onChange={weightInputHandler}
            onBlur={weightBlurHandler}
            value={weightValue}
            hasError={weightHasError}
            errMsg={'Provide valid height'}
          >Weight</Input>
        </div>
        <Button disabled={!isFormValid}>Change BMI data</Button>
      </>
      }
    </form>
  )
};