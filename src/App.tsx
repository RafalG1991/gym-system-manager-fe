import React, {useContext} from 'react';
import {Header} from "./components/Header/Header";

import background from './background.jpg';

import classes from './App.module.css';
import {AuthForm} from "./components/AuthForm/AuthForm";
import {AuthContext} from "./providers/AuthProvider";
import {Navigate, Route, Routes} from "react-router-dom";

const UnauthorizedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/login" element={<AuthForm/>}/>
      <Route path="/signup" element={<AuthForm register={true}/>}/>
    </Routes>
  )
}

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
      <div style={{height: '100%', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'top', backgroundRepeat: 'no-repeat', filter: 'blur(4px)', zIndex: -1}}/>
      {
        user ? <AuthorizedApp /> : <UnauthorizedApp />
      }
    </div>
  );
}