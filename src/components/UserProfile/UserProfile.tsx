import React, {useContext} from 'react';
import {ChangeNameForm} from "../Form/ChangeNameForm";
import {Loader} from "../utilities/Loader/Loader";
import {ChangePasswordForm} from "../Form/ChangePasswordForm";
import {ChangeBmiDataForm} from "../Form/ChangeBmiDataForm";
import {PersonalData} from "../PersonalData/PersonalData";
import {BmiData} from "../BmiData/BmiData";

import classes from './UserProfile.module.css';
import {UserDataContext} from "../../providers/UserDataProvider";

export const UserProfile = () => {
  const {userData, isLoading} = useContext(UserDataContext);

  if (isLoading) {
    return <Loader />
  }

  if (!userData) {
    return <>
      <Loader />
      <p>Loading Data Error</p>
    </>
  }

  return (
    <div className={classes.wrapper}>
      <h1>Your profile</h1>
      <PersonalData user={userData}/>
      <BmiData user={userData}/>
      <h3>Change data</h3>
      <ChangeBmiDataForm/>
      <ChangeNameForm/>
      <ChangePasswordForm />
    </div>
  );
}