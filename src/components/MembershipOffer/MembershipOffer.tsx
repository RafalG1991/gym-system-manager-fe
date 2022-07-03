import React from 'react';

import classes from './MembershipOffer.module.css';
import {Button} from "../utilities/Button/Button";

export const MembershipOffer = () => {
  return <div className={classes.wrapper}>
    <h3>Our gym pass offer</h3>
    <div className={classes.offersWrapper}>
      <div className={classes.offerWrapper}>
        <p className={classes.offerTitle}>Free first month trial!</p>
        <p className={classes.offerDescription}>Check our gym whole month for free! Only for new clients! You can use this offer only once!</p>
        <Button>Checkout</Button>
      </div>
      <div className={classes.offerWrapper}>
        <p className={classes.offerTitle}>Free first month trial!</p>
        <p className={classes.offerDescription}>Check our gym whole month for free! Only for new clients! You can use this offer only once!</p>
        <Button>Checkout</Button>
      </div>
      <div className={classes.offerWrapper}>
        <p className={classes.offerTitle}>Free first month trial!</p>
        <p className={classes.offerDescription}>Check our gym whole month for free! Only for new clients! You can use this offer only once!</p>
        <Button>Checkout</Button>
      </div>
    </div>
  </div>
}