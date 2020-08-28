import React, { useEffect } from 'react';
import './day.scss';

type DayProps = {
  date: Date,
  selected: Date
  setSelectedDate: Function
}

function Day(props: DayProps) {

  const isDateSame = (a:Date, b:Date):boolean => {
    return a.getMonth() === b.getMonth() && a.getDate() === b.getDate() && a.getFullYear() === b.getFullYear();
  }

  const dayClickedHandlder = ():void => {
    props.setSelectedDate(props.date);
  }

  const isThisDateSelected = (date:Date):boolean => {
    return isDateSame(new Date(props.selected), date);
  }

  return (
    <div className={'day '+ (isThisDateSelected(props.date)?'selected': '')} onClick={()=>dayClickedHandlder()}>
      <div className='header'>
        <div className='day-number'>
          {}
          <div className='number'>{props.date.getDate()}</div>
        </div>
      </div>
    </div>
  );
}

export default Day;
