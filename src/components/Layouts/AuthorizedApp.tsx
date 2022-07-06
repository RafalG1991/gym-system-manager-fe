import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {UserProfile} from "../UserProfile/UserProfile";
import {SideMenu} from "../SideMenu/SideMenu";

import classes from './AuthorizedApp.module.css';
import {MembershipView} from "../MembershipView/MembershipView";
import {ClassesView} from "../ClassesView/ClassesView";

export const AuthorizedApp = () => {

  return (
    <div className={classes.wrapper}>
      <SideMenu />
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/membership" element={<MembershipView />} />
        <Route path="/classes" element={<ClassesView />} />
        <Route path="*" element={<Navigate to="/" replace={true} />}/>
      </Routes>
    </div>
  );
}