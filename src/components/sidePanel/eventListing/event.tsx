import React from 'react';

type eventProps = {
  title: string,
  description: string,
  startDateTime: Date,
  endDateTime: Date
}

const Event = (props: eventProps) => {

  const current = new Date();

  const getReadableTime = (Date: Date) => {
    let hour: number = Date.getHours();
    let mins: string = '' + Date.getMinutes();
    let dayNight: string = 'AM';

    if (mins === '0') mins = '00';

    if (Date.getHours() > 12) {
      hour = Date.getHours() - 12;
      dayNight = 'PM';
    } else if (Date.getHours() === 0) {
      hour = 12;
      dayNight = 'AM';
    }
    return hour + ':' + mins + ' ' + dayNight;
  }

  const hasEventExpired = (date: Date): boolean => {
    if (date < current) {
      return true;
    }
    return false;
  }

  return (
    <div className={'event ' + (hasEventExpired(new Date(props.startDateTime)) ? 'expired' : '')}>
      <div className='time'>{getReadableTime(new Date(props.startDateTime))}</div>
      <div className='title'>{props.title}</div>
      <div className='desciption'>
        {props.description}
      </div>
    </div>
  )
}

export default Event;