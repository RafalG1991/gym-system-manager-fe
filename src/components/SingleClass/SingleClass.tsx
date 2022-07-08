import React, {useEffect, useState} from 'react';

import classes from './SingleClass.module.css';
import {useError} from "../../hooks/use-error";
import {Loader} from "../utilities/Loader/Loader";
import { ClassEntity } from 'types';
import {Link} from "react-router-dom";

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
        const res = await fetch(`/class/${eventId}`, {
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

  const convertTime = (time: string) => {
    let [hours, minutes] = time.split(':');
    const amOrPm = Number(hours)>=12 ? 'pm' : 'am';
    hours = Number(hours)%12+'' || '12';
    return (hours==='0' && amOrPm==='pm' ? '12' : hours)+':'+minutes+' '+amOrPm;
  }

  const getWeekDay = (dayNum: number) => {
    switch (dayNum) {
      case 0:
        return 'SUNDAY';
      case 1:
        return 'MONDAY';
      case 2:
        return 'TUESDAY';
      case 3:
        return 'WEDNESDAY';
      case 4:
        return 'THURSDAY';
      case 5:
        return 'FRIDAY';
      case 6:
        return 'SATURDAY';
    }
  }

  return <div className={classes.wrapper}>
    <h1>{event.name}</h1>
    <div>
      <p>Every <span className={classes.highlightedText}>{getWeekDay(event.day)}</span></p>
      <p>From <span className={classes.highlightedText}>{convertTime(event.starts)}</span> to <span className={classes.highlightedText}>{convertTime(event.ends)}</span></p>
      <h3>Description</h3>
      <p className={classes.description}>{event.description}</p>
    </div>
    <Link className={classes.backButton} to='/classes'>Back</Link>
  </div>
}