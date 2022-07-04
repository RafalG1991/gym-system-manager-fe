import React, {useContext} from 'react';
import {SingleOffer} from "../SingleOffer/SingleOffer";
import {UserDataContext} from "../../providers/UserDataProvider";

import classes from './MembershipOffer.module.css';
import {Loader} from "../utilities/Loader/Loader";

export const MembershipOffer = () => {
  const {userData} = useContext(UserDataContext);

  if(!userData) {
    return <>
      <Loader/>
      <p>Loading Data Error</p>
    </>
  }

  return <div className={classes.wrapper}>
    <h3>Our gym pass offer</h3>
    <div className={classes.offersWrapper}>
      {userData.membershipDate ? <SingleOffer title={'One month'} description={'One month gym pass. Standard price. Great opportunity to check our gym and stay longer.'} price={20}/> : <SingleOffer title={'One month free trial'} description={'One month gym pass free trial. New customers only.'} price={0}/>}
      <SingleOffer title={'Three months'} description={'Three months gym pass. Stay longer with us - pay less. Only now -$10!'} price={50}/>
      <SingleOffer title={'One year'} description={'One year gym pass subscription. Three months for free!'} price={180}/>
    </div>
  </div>
}