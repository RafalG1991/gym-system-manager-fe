import React, {useEffect, useState} from 'react';

import classes from './SingleClass.module.css';
import {useError} from "../../hooks/use-error";
import {Loader} from "../utilities/Loader/Loader";
import { ClassEntity } from 'types';
import {Link} from "react-router-dom";
import {EventInfo} from "../EventInfo/EventInfo";

interface Props {
  eventId: string;
}

export const SingleClass = ({eventId}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState<ClassEntity | null>();
  const {dispatchError} = useError();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/class/${eventId}`, {
          credentials: "include",
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': 'true',
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        if (res.ok) {
          setEvent(data);
        } else {
          dispatchError(data.err);
        }
      } catch (e) {
        dispatchError();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatchError, eventId]);

  if (isLoading) {
    return <Loader />
  }

  if (!event) {
    return <p>The event with this ID doesnt exist</p>
  }

  return <div className={classes.wrapper}>
    <h1>{event.name}</h1>
    <EventInfo event={event}/>
    <Link className={classes.backButton} to='/classes'>Back</Link>
  </div>
}