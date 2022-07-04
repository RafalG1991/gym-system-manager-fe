import React, {useContext} from 'react';
import {SingleOffer} from "../SingleOffer/SingleOffer";
import {UserDataContext} from "../../providers/UserDataProvider";

import classes from './MembershipOffer.module.css';

import {Loader} from "../utilities/Loader/Loader";
import {Button} from "../utilities/Button/Button";

export const MembershipOffer = () => {
  const {userData, setIdMembership, idMembership} = useContext(UserDataContext);

  const reloadInputData = () => {
    setIdMembership('');
  }

  if(!userData) {
    return <>
      <Loader/>
      <p>Loading Data Error</p>
    </>
  }

  return <div className={classes.wrapper}>
    <h3>Our gym pass offer</h3>
    <div className={classes.offersWrapper}>
      {idMembership ? <div className={classes.offersSuccess}>
          <p>Your gym pass has been extended!</p>
          <Button onClick={reloadInputData}>Buy again!</Button>
        </div> : <>
        {userData.membershipDate ? <SingleOffer title={'One month'} description={'One month gym pass. Standard price. Great opportunity to check our gym and stay longer.'} price={20} months={1}/> : <SingleOffer title={'One month free trial'} description={'One month gym pass free trial. New customers only.'} price={0} months={1}/>}
        <SingleOffer title={'Three months'} description={'Three months gym pass. Stay longer with us - pay less. Only now -$10!'} price={50} months={3}/>
        <SingleOffer title={'One year'} description={'One year gym pass subscription. Three months for free!'} price={180} months={12}/>
      </>}
    </div>
  </div>
}