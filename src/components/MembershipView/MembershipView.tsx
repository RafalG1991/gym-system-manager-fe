import React, {useContext} from 'react';
import {UserDataContext} from "../../providers/UserDataProvider";
import {Loader} from "../utilities/Loader/Loader";

import classes from './MembershipView.module.css';
import {MembershipStatus} from "../MembershipStatus/MembershipStatus";
import {MembershipOffer} from "../MembershipOffer/MembershipOffer";


export const MembershipView = () => {
  const {userData} = useContext(UserDataContext);

  if(!userData) {
    return <>
      <Loader />
      <p>Loading Data Error</p>
    </>
  }

  return <div className={classes.wrapper}>
    <h1>Membership</h1>
    <MembershipStatus />
    <MembershipOffer />
  </div>
};