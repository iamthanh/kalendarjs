import React, { useEffect, useState } from 'react';
import './day.scss';
import { store } from './../../../../store';
import { setSelectedDate } from './../../../../actions/selectedDate';
import { connect } from 'react-redux';
import Events from './events';

type DayProps = {
  date: Date,
  selected: Date
  setSelectedDate: Function
  store: any
}

const Day = (props: DayProps) => {

  const [eventsForDay, setEventsForDay] = useState<any[]>([])

  useEffect(() => {
    const addEventsForDay = () => {
      if (props.store.userEvents) {
        let eventsToAdd : any[] = [];
        for (let i = 0; i < props.store.userEvents.length; i++) {
          let _event = props.store.userEvents[i];
          if (isDateSame(new Date(props.date), new Date(_event.startDateTime))) {
            eventsToAdd.push(_event);
          }
        }
        setEventsForDay(eventsToAdd);
      }
    }

    addEventsForDay();
  }, [props.store]);

  const isDateSame = (a: Date, b: Date): boolean => {
    return a.getMonth() === b.getMonth() && a.getDate() === b.getDate() && a.getFullYear() === b.getFullYear();
  }

  const dayClickedHandlder = (): void => {
    if (!isDateSame(props.store.selectedDate, props.date)) {
      store.dispatch(setSelectedDate(props.date))
    }
  }

  const isThisDateSelected = (date: Date): boolean => {
    return isDateSame(new Date(props.store.selectedDate), date);
  }

  return (
    <div className={'day ' + (isThisDateSelected(props.date) ? 'selected' : '')} onClick={() => dayClickedHandlder()}>
      <div className='header'>
        <div className='day-number'>
          <div className='number'>{props.date.getDate()}</div>
        </div>
      </div>

      <Events events={eventsForDay} />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { store: state }
}

export default connect(mapStateToProps)(Day);
