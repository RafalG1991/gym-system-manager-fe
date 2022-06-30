import React, {useEffect, useState} from 'react';
import {Form} from "../Form/Form";
import {UserDataResponse} from 'types';

import classes from './UserProfile.module.css';
import {Modal} from "../Modal/Modal";
import {Loader} from "../utilities/Loader/Loader";

export const UserProfile = () => {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [isLoading,setIsLoading] = useState(false);

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
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={classes.wrapper}>
      {user ? <h1>Welcome back {user.email}</h1> : null}
      <Form firstName={user?.firstname} lastName={user?.lastname}/>
    </div>
  );
}