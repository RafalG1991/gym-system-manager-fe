import React from 'react';
import {Button} from "../utilities/Button/Button";

import classes from './SingleOffer.module.css';

interface Props {
  title: string;
  description: string;
  price:number;
}

export const SingleOffer = ({title, description, price}: Props) => {

  return <div className={classes.offerWrapper}>
    <p className={classes.offerTitle}>{title}</p>
    <p className={classes.offerDescription}>{description}</p>
    <p className={classes.offerPrice}>${price}</p>
    <Button>Checkout</Button>
  </div>
}