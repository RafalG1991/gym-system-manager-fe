import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";

import classes from'./Navigation.module.css';
import {AuthContext} from "../../providers/AuthProvider";

export const Navigation = () => {
  const {user, signOut} = useContext(AuthContext);

  return (
    <nav className={classes.navigation}>
      <NavLink to='/' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Map</NavLink>
      {
        user ? (
          <>
            <NavLink to='/add' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Add an advertisement</NavLink>
            <NavLink to='/' onClick={signOut} className={classes.inactiveLink}>Sign out</NavLink>
          </>
        ) : (
          <>
            <NavLink to='/login' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Sign in</NavLink>
            <NavLink to='/signup' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Sign up</NavLink>
          </>
        )
      }
    </nav>
  );
};