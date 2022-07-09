import React from 'react';
import { ClassEntity } from 'types';

import classes from './EventInfo.module.css';

export const EventInfo = ({event}: { event: ClassEntity }) => {

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

  return <div>
    <p>Every <span className={classes.highlightedText}>{getWeekDay(event.day)}</span></p>
    <p>From <span className={classes.highlightedText}>{convertTime(event.starts)}</span> to <span className={classes.highlightedText}>{convertTime(event.ends)}</span></p>
    <h3>Description</h3>
    <p className={classes.description}>{event.description}</p>
  </div>
}