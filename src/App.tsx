import React, { useState, useEffect } from 'react';
import './App.css';
import SchedulePanel from './components/schedulePanel/schedulePanel';
import ConnectedMainPanel from './components/mainPanel/mainPanel';
import './kalendarjs.scss';
import { setSelectedDate } from './actions/selectedDate';
import { Provider } from 'react-redux';
import { store } from './store';

function KalendarJs() {

  useEffect(()=> {
      // Setting to today's date
      store.dispatch(setSelectedDate(new Date()))
  }, []);

  return (
    <div className="KalendarJs">
      <Provider store={store}>
        <SchedulePanel />
        <ConnectedMainPanel />
      </Provider>
    </div>
  );
}

export default KalendarJs;
