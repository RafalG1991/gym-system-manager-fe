import React, {useContext} from 'react';

import classes from './MembershipStatus.module.css';
import {UserDataContext} from "../../providers/UserDataProvider";
import {Loader} from "../utilities/Loader/Loader";

export const MembershipStatus = () => {
  const {userData} = useContext(UserDataContext);

  if(!userData) {
    return <>
      <Loader />
      <p>Loading Data Error</p>
    </>
  }

  let membershipStatus;
  let backgroundColor;
  let borderColor;
  if (userData.membershipDate) {
    if ((new Date(userData.membershipDate)) < new Date()) {
      membershipStatus = <p>Your gym pass has expired on {new Date(userData.membershipDate).toLocaleDateString()}.</p>;
      backgroundColor = '#ec929d';
      borderColor = '#d70011';

    } else {
      membershipStatus = <p>You have a valid gym pass till {new Date(userData.membershipDate).toLocaleDateString()}</p>;
      backgroundColor = '#62d552';
      borderColor = '#219522';
    }
  } else {
    membershipStatus = <p>You haven't bought your gym pass yet</p>
    backgroundColor = '#ec929d';
    borderColor = '#d70011';
  }


  return <div className={classes.status} style={{backgroundColor, borderColor}}>
    {membershipStatus}
  </div>
}