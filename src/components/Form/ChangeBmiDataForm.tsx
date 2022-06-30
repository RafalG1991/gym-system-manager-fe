import React, {FormEvent, useContext, useState} from 'react';
import {Button} from "../utilities/Button/Button";
import {Input} from "../Input/Input";
import {useForm} from "../../hooks/use-form";
import {AuthContext} from "../../providers/AuthProvider";
import {Loader} from "../utilities/Loader/Loader";

import classes from './Form.module.css';

interface optionalInitialValues {
  height?: string;
  weight?: string;
  triggerReload: (id: string) => void;
}

export const ChangeBmiDataForm = ({height, weight, triggerReload}: optionalInitialValues) => {
  const {user} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const [id, setId] = useState('');

  const {
    value: heightValue,
    valueInputHandler: heightInputHandler,
    valueBlurHandler: heightBlurHandler,
    hasError: heightHasError,
    isValid: isHeightValid,
    valueReset: heightReset,
    setValue: setHeight,
  } = useForm(value => value.trim().length !== 0 && Number(value) > 0 && Number(value) < 300);

  const {
    value: weightValue,
    valueInputHandler: weightInputHandler,
    valueBlurHandler: weightBlurHandler,
    hasError: weightHasError,
    isValid: isWeightValid,
    valueReset: weightReset,
    setValue: setWeight,
  } = useForm(value => value.trim().length !== 0 && Number(value) > 0 && Number(value) < 999);

  let isFormValid = false;

  if(isHeightValid && isWeightValid && (heightValue !== height || weightValue !== weight)) {
    isFormValid = true;
  }

  if(!heightValue && !weightValue && height && weight) {
    setHeight(height);
    setWeight(weight);
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
          height: heightValue,
          weight: weightValue,
        }),
      });
      setId(await res.json());
    } finally {
      setIsLoading(false);
    }
    heightReset();
    weightReset();
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