import React from 'react';
import {Navigation} from "../Navigation/Navigation";
import {Logo} from "../Logo/Logo";

import classes from './Header.module.css';


export const Header = () => {
  return (
    <header className={classes.wrapper}>
      <Logo />
      <Navigation />
    </header>
  );
}