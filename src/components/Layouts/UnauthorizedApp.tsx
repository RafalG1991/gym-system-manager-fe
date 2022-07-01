import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthForm} from "../AuthForm/AuthForm";

import classes from './UnauthorizedApp.module.css';

export const UnauthorizedApp = () => {
  return <>
    <div className={classes.background}/>
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/login" element={<AuthForm/>}/>
      <Route path="/signup" element={<AuthForm register={true}/>}/>
      <Route path="*" element={<Navigate to="/" replace={true} />}/>
    </Routes>
  </>
}