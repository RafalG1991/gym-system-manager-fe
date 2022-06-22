import React, {useContext} from 'react';
import {Header} from "./components/Header/Header";
import classes from './App.module.css';
import {AuthContext} from "./providers/AuthProvider";
import {UnauthorizedApp} from "./components/Layouts/UnauthorizedApp";
import {AuthorizedApp} from "./components/Layouts/AuthorizedApp";





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