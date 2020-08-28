import React, { useState, useEffect } from 'react';
import Day from './day';
import './week.scss';

type WeekProps = {
  startingDate?: number,
  startingMonth?: number
  startingYear?: number
  selectedDate: Date
  setSelectedDate: Function
}

const Week = (props: WeekProps) => {

  const [weeksGenerated, setWeeksGenerated] = useState(false);
  const [days, setDays] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateDaysForWeek = (): Array<JSX.Element> => {
      let i = 0;
      let _fullDate: string = ((props.startingMonth ? props.startingMonth : 0) + 1) + '/' + props.startingDate + '/' + props.startingYear;
      let _date = new Date(_fullDate);
      let _days: Array<JSX.Element> = [];

      _days.push(
        <Day
          selected={props.selectedDate}
          key={new Date(_fullDate).getTime()}
          date={new Date(_fullDate)}
          setSelectedDate={props.setSelectedDate}
        />
      );

      while (_days.length < 7) {
        // Add date 
        _days.push(
          <Day
            selected={props.selectedDate}
            key={_date.toDateString()}
            date={_date}
            setSelectedDate={props.setSelectedDate}
          />
        )
        // Move date up a day and update _date
        _date = new Date(_date.setDate(_date.getDate() + 1));
        i++;
      }
      return _days;
    }
    setDays(generateDaysForWeek());
    setWeeksGenerated(true);
  }, [props.selectedDate])

  return (
    <div className="week">
      {days}
    </div>
  );
}

export default Week;
