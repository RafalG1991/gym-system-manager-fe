import React from 'react';
import {NavLink} from "react-router-dom";

import classes from './SideMenu.module.css';

export const SideMenu = () => (<nav>
  <ul className={classes.wrapper}>
    <li>
      <NavLink to='/' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Profile</NavLink>
    </li>
    <li>
    <NavLink to='/' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Membership</NavLink>
    </li>
    <li>
    <NavLink to='/' className={({ isActive }) => isActive ? classes.activeLink : classes.inactiveLink}>Classes</NavLink>
    </li>
  </ul>
</nav>);

