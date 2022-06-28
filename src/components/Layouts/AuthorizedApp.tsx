import React, {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {UserProfile} from "../UserProfile/UserProfile";

import classes from './AuthorizedApp.module.css';

export const AuthorizedApp = () => {

  return (
    <div className={classes.wrapper}>
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" replace={true} />}/>
      </Routes>
    </div>
  );
}