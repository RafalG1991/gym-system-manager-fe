import React, {useEffect, useState} from 'react';
import {ChangeNameForm} from "../Form/ChangeNameForm";
import {UserDataResponse} from 'types';
import {Loader} from "../utilities/Loader/Loader";
import {ChangePasswordForm} from "../Form/ChangePasswordForm";

import classes from './UserProfile.module.css';
import {Bmi} from "../Bmi/Bmi";
import {ChangeBmiDataForm} from "../Form/ChangeBmiDataForm";

export const UserProfile = () => {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [isLoading,setIsLoading] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
      (async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/user/data', {
            credentials: "include",
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'true',
              "Content-Type": "application/json",
            }
          });
          if(res.ok) {
            const data = await res.json();
            setUser(data);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      })();
  }, [id]);

  const triggerReload = (id: string) => {
    setId(id);
  }

  const calculateBMI = (height: number, weight: number) => {
    return (Math.round((weight/(height*height*0.0001))*100)/100).toFixed(2);
  }

  if (isLoading) {
    return <Loader />
  }

  if (!user) {
    return <>
      <Loader />
      <p>Loading Data Error</p>
    </>
  }



  return (
    <div className={classes.wrapper}>
      <h1>Your profile</h1>
      <h3>Personal data</h3>
      <div className={classes.bio}>
        <div className={classes.data}>
          <p>First name: {user.firstname}</p>
          <p>Last name: {user.lastname}</p>
          <p>Email: {user.email}</p>
          <p>Member since: {new Date(user.memberSince).toLocaleDateString()} </p>
        </div>
      </div>
      <h3>BMI data</h3>
      <div className={classes.bio}>
        <Bmi bmi={calculateBMI(Number(user.height), Number(user.weight))}/>
        <div className={classes.data}>
          <p>Height: {user.height} cm</p>
          <p>Weight: {user.weight} kg</p>
        </div>
      </div>
      <h3>Change data</h3>
      <ChangeBmiDataForm height={user.height} weight={user.weight} triggerReload={triggerReload}/>
      <ChangeNameForm firstName={user.firstname} lastName={user.lastname} triggerReload={triggerReload}/>
      <ChangePasswordForm />
    </div>
  );
}