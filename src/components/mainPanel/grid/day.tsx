import React, { useEffect } from 'react';
import './day.scss';

type DayProps = {
  date: Date
}

function Day(props:DayProps) {

  useEffect(()=> {

    //

  }, [])

  return (
    <div className="day">
        {(props.date.getMonth()+1)+'/'+props.date.getDate()+'/'+props.date.getFullYear()}
    </div>
  );
}

export default Day;
