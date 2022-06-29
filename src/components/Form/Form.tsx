import React, {FormEvent, useContext, useState} from 'react';
import {Button} from "../utilities/Button/Button";
import {Input} from "../Input/Input";

import classes from './Form.module.css';
import {useForm} from "../../hooks/use-form";
import {Link} from "react-router-dom";
import {AuthContext} from "../../providers/AuthProvider";
import {Modal} from "../Modal/Modal";

export const Form = () => {
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
  } = useForm(value => value.trim() !== '');

  const {
    value: lastNameValue,
    valueInputHandler: lastNameInputHandler,
    valueBlurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
    isValid: isLastNameValid,
    valueReset: lastNameReset,
  } = useForm(value => value.trim() !== '');

  let isFormValid = false;

  if(isFirstNameValid && isLastNameValid) {
    isFormValid = true;
  }

  const submitHandler = async (e: FormEvent) => {
    // e.preventDefault();
    // if(!isFormValid || !user) return;
    // setIsLoading(true);
    // try {
    //   const res = await fetch('/ad', {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: {
    //       'Access-Control-Allow-Origin':'origin',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       title: titleValue,
    //       link: linkValue,
    //       content: contentValue,
    //       apNumber: apartmentValue,
    //       street: streetValue,
    //       city: cityValue,
    //       postal: postalValue,
    //       public: false,
    //       price: Number(priceValue),
    //       userId: user.sub,
    //     }),
    //   });
    //   setId(await res.json());
    // } finally {
    //   setIsLoading(false);
    // }
    // titleReset();
    // contentReset();
    // streetReset();
    // apartmentReset();
    // cityReset();
    // postalReset();
    // linkReset();
    // priceReset();
  }

  if (isLoading) {
    return <Modal>
        <p>Changing data in progress...</p>
    </Modal>
  }

  if (id) {
    return <Modal>
          <p>Your data has successfully been changed!</p>
          <Link to='/'>Return to profile</Link>
    </Modal>
  }


  return (
    <form className={classes.wrapper} onSubmit={submitHandler}>
      <div className={classes.advert}>
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
    </form>
  )
};