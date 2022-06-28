import React from "react";
import {Route, Routes} from "react-router-dom";
import {UserProfile} from "../UserProfile/UserProfile";

export const AuthorizedApp = () => {
  return (
      <Routes>
        <Route path="/" element={<UserProfile />} />
      </Routes>
  );
}