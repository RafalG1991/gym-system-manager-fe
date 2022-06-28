import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {UserProfile} from "../UserProfile/UserProfile";
import {SideMenu} from "../SideMenu/SideMenu";

import classes from './AuthorizedApp.module.css';

export const AuthorizedApp = () => {

  return (
    <div className={classes.wrapper}>
      <SideMenu />
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" replace={true} />}/>
      </Routes>
    </div>
  );
}