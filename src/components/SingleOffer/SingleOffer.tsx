import React, {useContext} from 'react';
import {Button} from "../utilities/Button/Button";

import classes from './SingleOffer.module.css';
import {UserDataContext} from "../../providers/UserDataProvider";

interface Props {
  title: string;
  description: string;
  price: number;
  months: number;
}

export const SingleOffer = ({title, description, price, months}: Props) => {
  const {extendMembership} = useContext(UserDataContext);

  const extendMembershipHandler = async () => {
    await extendMembership(months);
  }

  return <div className={classes.offerWrapper}>
    <p className={classes.offerTitle}>{title}</p>
    <p className={classes.offerDescription}>{description}</p>
    <p className={classes.offerPrice}>${price}</p>
    <Button onClick={extendMembershipHandler}>Checkout</Button>
  </div>
}