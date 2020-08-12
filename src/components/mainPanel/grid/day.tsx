import React, { useEffect } from 'react';

type DayProps = {
  date: Date
}

function Day(props:DayProps) {

  useEffect(()=> {

    //

  }, [])

  return (
    <div className="Day">
        {props.date.getMonth()+'/'+props.date.getDate()+'/'+props.date.getFullYear()}
    </div>
  );
}

export default Day;
