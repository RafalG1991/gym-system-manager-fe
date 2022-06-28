import React from 'react';
import {NavLink} from "react-router-dom";

import classes from './UserProfile.module.css';

export const UserProfile = () => {
  return (
    <div className={classes.wrapper}>
      <h1>Welcome back!</h1>
      <nav>
        <ul>
          <li>
            <NavLink to='/' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Profile</NavLink>
            <NavLink to='/' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Membership</NavLink>
            <NavLink to='/' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Classes Schedule</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}