import React from 'react';
import {Header} from "./components/Header/Header";

import background from './background.jpg';

import classes from './App.module.css';

export const App = () => {

  return (
    <div className={classes.wrapper}>
      <Header />
      <div style={{height: '100%', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'top', backgroundRepeat: 'no-repeat'}}/>
    </div>
  );
}