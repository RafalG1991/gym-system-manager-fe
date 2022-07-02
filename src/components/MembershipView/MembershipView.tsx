import React, {useContext} from 'react';
import {UserDataContext} from "../../providers/UserDataProvider";
import {Loader} from "../utilities/Loader/Loader";

import classes from './MembershipView.module.css';


export const MembershipView = () => {
  const {userData, isLoading} = useContext(UserDataContext);

  if(!userData) {
    return <>
      <Loader />
      <p>Loading Data Error</p>
    </>
  }

  let membershipStatus;
  if (userData.membershipDate) {
    if ((new Date(userData.membershipDate)) < new Date()) {
      membershipStatus = <p>Your membership has ended!</p>;
    } else {
      membershipStatus = <p>You have valid membership!</p>;
    }
  } else {
    membershipStatus = <p>You have no membership! Buy one!</p>
  }

  return <div className={classes.wrapper}>
    <h1>Membership</h1>
    <div className={classes.status}>
      {membershipStatus}
    </div>
  </div>
};