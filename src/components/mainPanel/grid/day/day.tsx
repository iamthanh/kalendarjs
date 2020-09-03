import React, { useEffect } from 'react';
import './day.scss';
import { store } from './../../../../store';
import { setSelectedDate } from './../../../../actions/selectedDate';
import { connect } from 'react-redux';

type DayProps = {
  date: Date,
  selected: Date
  setSelectedDate: Function
  store: any
}

const Day = (props: DayProps) => {

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
          {}
          <div className='number'>{props.date.getDate()}</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { store: state }
}

export default connect(mapStateToProps)(Day);
