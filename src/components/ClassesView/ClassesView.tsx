import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {useError} from "../../hooks/use-error";

import classes from './ClassesView.module.css';
import {Loader} from "../utilities/Loader/Loader";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

export const ClassesView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState();
  const {dispatchError} = useError();

  useEffect(() => {
    (async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/class', {
            credentials: "include",
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': 'true',
              "Content-Type": "application/json",
            }
          });
          const data = await res.json();
          if (res.ok) {
            setEvents(data);
            console.log(data);
          } else {
            dispatchError(data.err);
          }
        } catch (e) {
          dispatchError();
        } finally {
          setIsLoading(false);
        }
    })();
  }, [dispatchError]);

  if (isLoading) {
    return <Loader />
  }

  if (!events) {
    return <ErrorMessage />
  }

  return <div className={classes.wrapper}>
    <h1>Classes</h1>
    <FullCalendar
      allDaySlot={false}
      plugins={[ timeGridPlugin ]}
      initialView="timeGridWeek"
      events={events}
      nowIndicator={true}
    />
  </div>
}