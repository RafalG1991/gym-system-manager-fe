import React from 'react';
import logo from '../../logo.png';

import classes from './Header.module.css';

export const Header = () => {
  return (
    <header className={classes.wrapper}>
      <img src={logo} alt="logo" className={classes.logoImg}/>
      <h1 className={classes.logo}><strong>GYM</strong> System Manager</h1>
    </header>
  );
}