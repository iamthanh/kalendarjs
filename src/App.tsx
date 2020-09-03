import React, { useState, useEffect } from 'react';
import './App.css';
import SchedulePanel from './components/schedulePanel/schedulePanel';
import MainPanel from './components/mainPanel/mainPanel';
import './kalendarjs.scss';
import { createStore } from 'redux';
import allReducer  from './reducers';
import {setSelectedDate} from './actions/day.actions';
import { Provider } from 'react-redux';

function KalendarJs() {

  console.log('rendering ')
  
  let store = createStore(allReducer);
  console.log(store.getState());
  store.dispatch(setSelectedDate(new Date('07/11/2019')))
  console.log(store.getState());


  // useEffect(()=> {
  //     const fetchData = async () => {
  //     }
  //     const setCurrentDate = () => {
  //     }

  //     fetchData();

  // }, []);

  return (
    <div className="KalendarJs">
      <Provider store={store}>

      </Provider>
      <SchedulePanel />
      <MainPanel />
    </div>
  );
}

export default KalendarJs;
