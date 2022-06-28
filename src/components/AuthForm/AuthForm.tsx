import React, {FormEvent, useContext} from 'react';
import {Input} from "../Input/Input";
import {useForm} from "../../hooks/use-form";
import {AuthContext} from "../../providers/AuthProvider";
import {Button} from "../utilities/Button/Button";
import {Navigate} from "react-router-dom";
import {Modal} from "../Modal/Modal";

interface Props {
  register?: boolean;
}

export const AuthForm = ({register=false}: Props) => {
  const {signIn, signUp} = useContext(AuthContext);
  const {
    value: loginValue,
    valueInputHandler: loginInputHandler,
    valueBlurHandler: loginBlurHandler,
    hasError: loginHasError,
    isValid: isLoginValid,
    valueReset: loginReset,
  } = useForm(value => value.trim() !== '' && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value));

  const {
    value: passwordValue,
    valueInputHandler: passwordInputHandler,
    valueBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValid: isPasswordValid,
    valueReset: passwordReset,
  } = useForm(value => value.trim().length > 8);

  let isFormValid = false;

  if(isLoginValid && isPasswordValid) {
    isFormValid = true;
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if(!isFormValid) return;
    try {
      register ? signUp({login: loginValue, password: passwordValue}) : signIn({login: loginValue, password: passwordValue});
    } catch (e) {
      console.log(e);
    }
    loginReset();
    passwordReset();
  }

  return (
    <Modal>
      <h2>{register ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={submitHandler}>
        <Input
          id="login"
          value={loginValue}
          onBlur={loginBlurHandler}
          onChange={loginInputHandler}
          hasError={loginHasError}
          errMsg={'Login must be a valid e-mail address'}
        >
          Login
        </Input>
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
        <Button disabled={!isFormValid}>{register ? 'Sign up' : 'Sign in'}</Button>
      </form>
    </Modal>
  )
}