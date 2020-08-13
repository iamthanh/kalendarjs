import React, { useState, useEffect } from 'react';
import Day from './day';

type WeekProps = {
  startingDate?: number,
  startingMonth?: number
  startingYear?: number
}

const Week = (props: WeekProps) => {

  const [days, setDays] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateDaysForWeek = (): Array<JSX.Element> => {
      let i = 0;
      let _fullDate: string = ((props.startingMonth ? props.startingMonth : 0) + 1) + '/' + props.startingDate + '/' + props.startingYear;
      let _date = new Date(_fullDate);

      let _days: Array<JSX.Element> = [];
      _days.push(
        <Day
          key={new Date(_fullDate).getTime()}
          date={new Date(_fullDate)}
        />
      );

      while (_days.length < 6) {
        // Add date 
        _days.push(
          <Day
            key={_date.toDateString()}
            date={_date}
          />
        )
        // Move date up a day and update _date
        _date = new Date(_date.setDate(_date.getDate() + 1));
        i++;
      }
      return _days;
    }
    // console.log(startingDate, startingMonth, startingYear)
    setDays(generateDaysForWeek());
  }, [])

  return (
    <div className="Week">
      {days}
    </div>
  );
}

export default Week;
