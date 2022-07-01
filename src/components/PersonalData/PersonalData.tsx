import React from 'react';
import { UserDataResponse } from '../../../../gym-system-manager-be/types/user';

import classes from './PersonalData.module.css';

interface Props {
  user: UserDataResponse;
}

export const PersonalData = ({user}: Props) => {
  return <>
    <h3>Personal data</h3>
    <div className={classes.bio}>
      <div className={classes.data}>
        <p><span>First name:</span>{user.firstname || 'provide your personal data below'}</p>
        <p><span>Last name:</span>{user.lastname || 'provide your personal data below'}</p>
        <p><span>Email:</span>{user.email}</p>
        <p><span>Member since:</span>{new Date(user.memberSince).toLocaleDateString()}</p>
      </div>
    </div>
  </>
}