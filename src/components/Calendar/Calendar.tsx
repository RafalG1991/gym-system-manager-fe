import React, {useEffect, useState} from 'react';
import classes from './Calendar.module.css';
import FullCalendar, {EventClickArg} from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {useError} from "../../hooks/use-error";
import {useNavigate} from "react-router-dom";
import {Loader} from "../utilities/Loader/Loader";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

interface Props {
  getIdOnClick: (id: string) => void;
}

const views = {
  dayGridThreeDay: {
    type: 'timeGridWeek',
    duration: { days: 3 }
  }
}

export const Calendar = ({getIdOnClick}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState();
  const {dispatchError} = useError();
  const navigate = useNavigate();

  const clickHandler = (info: EventClickArg) => {
    info.jsEvent.preventDefault();
    getIdOnClick(info.event._def.publicId);
    navigate(info.event._def.url);
  }

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
      initialView="dayGridThreeDay"
      views={views}
      events={events}
      nowIndicator={true}
      slotMinTime="09:00:00"
      slotMaxTime="20:00:00"
      height={620}
      eventClick={clickHandler}
    />
  </div>
}