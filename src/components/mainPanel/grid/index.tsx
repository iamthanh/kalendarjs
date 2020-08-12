import React, { useState, useEffect } from 'react';
import Week from './week';

function Grid() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderedWeeks, setRenderedWeeks] = useState<JSX.Element[]>([]);

  const [preloadMonthsBefore, setPreloadMonthsBefore] = useState<number>(1);
  const [preloadMonthsAfter, setPreloadMonthsAfter] = useState<number>(1);

  let weeksGenerated: any = [];
  let maxInitWeeks = 4;

  const currentDate = new Date();
  const startingDayOfWeek = 1; // Monday, 0 is Sunday

  useEffect(() =>  {
    const generateWeeks = (): Array<JSX.Element> => {
      let i: number = 0;
      let _weeks = [];

      // We start out with building the current week
      let _date:Date = getStartingDateOfWeek(new Date(currentDate.setDate(currentDate.getDate()-(7*maxInitWeeks/2))));
      while (_weeks.length < maxInitWeeks) {
        // push a week to the end
        let forwardTemp = new Date(_date.setDate(_date.getDate()+7));
        _weeks.push(
          <Week
            key={i}
            startingDate={forwardTemp.getDate()}
            startingMonth={forwardTemp.getMonth()}
            startingYear={forwardTemp.getFullYear()}
          />
        );
        i++;
      }
      return _weeks;
    }

    // const getWeekFromStarting = (date?:Date): JSX.Element => {
    //   // If date isnt set, use current
    //   if(!date) date = new Date();
      
    //   return (
    //     <Week
    //       key={date.getDate()+':'+date.getMonth()+':'+date.getFullYear()}
    //       startingDate={date.getDate()}
    //       startingMonth={date.getMonth()}
    //       startingYear={date.getFullYear()}
    //     />
    //   )
    // }

    const getStartingDateOfWeek = (date:Date): Date => {
      let _day: Date = date;
      // Move back til monday
      while (_day.getDay() !== startingDayOfWeek) {
        _day.setDate(_day.getDate() - 1);
      }
      return _day;
    }

    setRenderedWeeks(generateWeeks);

  }, [])

  let renderWeeks = '';

  return (
    <div className="grid">
      {renderedWeeks}
    </div>
  );
}

export default Grid;
