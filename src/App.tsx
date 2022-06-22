import React, {useContext} from 'react';
import {Header} from "./components/Header/Header";

import background from './background.jpg';

import classes from './App.module.css';
import {AuthForm} from "./components/AuthForm/AuthForm";
import {AuthContext} from "./providers/AuthProvider";
import {Navigate, Route, Routes} from "react-router-dom";
import {UnauthorizedApp} from "./components/Layouts/UnauthorizedApp";



const AuthorizedApp = () => {
  return (
    <h1>This is authorized app</h1>
  )
}

export const App = () => {
  const {user} = useContext(AuthContext);

  return (
    <div className={classes.wrapper}>
      <Header />

      {
        user ? <AuthorizedApp /> : <UnauthorizedApp />
      }
    </div>
  );
}