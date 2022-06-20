import React from 'react';
import logo from "../../logo.png";

import classes from './Logo.module.css';

export const Logo = () => (
  <div className={classes.wrapper}>
    <img src={logo} alt="logo" className={classes.logoImg}/>
    <h1 className={classes.logo}><strong>GYM</strong> System Manager</h1>
  </div>
)