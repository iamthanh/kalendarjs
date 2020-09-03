import React, { useState, useEffect } from 'react';
import Week from './week/week';
import './grid.scss';
import GridHeader from './gridHeader/gridHeader';


function Grid() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderedWeeks, setRenderedWeeks] = useState<JSX.Element[]>([]);

  const [preloadMonthsBefore, setPreloadMonthsBefore] = useState<number>(1);
  const [preloadMonthsAfter, setPreloadMonthsAfter] = useState<number>(1);

  const [selectedDate, setSelectedDate] = useState(new Date());

  let weeksGenerated: any = [];
  let maxInitWeeks = 9;

  const startingDayOfWeek = 1; // Monday, 0 is Sunday

  useEffect(() => {
    const generateWeeks = (): Array<JSX.Element> => {

      let i: number = 0;
      let _weeks = [];

      // We start out with building the current week
      let currentDate = new Date();
      let _date: Date = getStartingDateOfWeek(new Date(currentDate.setDate(currentDate.getDate() - (7 * maxInitWeeks / 2))));

      while (_weeks.length < maxInitWeeks) {
        // push a week to the end
        let forwardTemp = new Date(_date.setDate(_date.getDate() + 7));
        _weeks.push(
          <Week
            key={i}
            selectedDate={selectedDate}
            startingDate={forwardTemp.getDate()}
            startingMonth={forwardTemp.getMonth()}
            startingYear={forwardTemp.getFullYear()}
            setSelectedDate={setSelectedDate}
          />
        );
        i++;
      }
      return _weeks;
    }

    const getStartingDateOfWeek = (date: Date): Date => {
      let _day: Date = date;
      // Move back til monday
      while (_day.getDay() !== startingDayOfWeek) {
        _day.setDate(_day.getDate() - 1);
      }
      return _day;
    }

    setRenderedWeeks(generateWeeks);
  }, [selectedDate])

  return (
    <React.Fragment>
      <GridHeader />
      <div className="grid">
        {renderedWeeks}
      </div>
    </React.Fragment>
  );
}

export default Grid;
