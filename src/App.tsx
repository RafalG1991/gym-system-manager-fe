import React, {useContext} from 'react';
import {Header} from "./components/Header/Header";
import {AuthContext} from "./providers/AuthProvider";
import {UnauthorizedApp} from "./components/Layouts/UnauthorizedApp";
import {AuthorizedApp} from "./components/Layouts/AuthorizedApp";
import {UserDataProvider} from "./providers/UserDataProvider";
import {ErrorMessage} from "./components/ErrorMessage/ErrorMessage";
import {useError} from "./hooks/use-error";

import classes from './App.module.css';

export const App = () => {
  const {user} = useContext(AuthContext);
  const { error } = useError();

  return (
    <div className={classes.wrapper}>
      <Header />
      {error ? <ErrorMessage message={error}/> : null}
      {
        user ?
          <UserDataProvider>
            <AuthorizedApp />
          </UserDataProvider>
          :
          <UnauthorizedApp />
      }
    </div>
  );
}