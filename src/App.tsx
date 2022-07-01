import React, {useContext} from 'react';
import {Header} from "./components/Header/Header";
import {AuthContext} from "./providers/AuthProvider";
import {UnauthorizedApp} from "./components/Layouts/UnauthorizedApp";
import {AuthorizedApp} from "./components/Layouts/AuthorizedApp";

import classes from './App.module.css';
import {UserDataProvider} from "./providers/UserDataProvider";

export const App = () => {
  const {user} = useContext(AuthContext);

  return (
    <div className={classes.wrapper}>
      <Header />
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