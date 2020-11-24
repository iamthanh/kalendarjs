import React, { useState, useEffect } from 'react';
import './App.css';
import SidePanel from './components/sidePanel/sidePanel';
import ConnectedMainPanel from './components/mainPanel/mainPanel';
import './kalendarjs.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from './services/api';

import { setSelectedDate } from './actions/selectedDate';
import { setUserEvents } from './actions/userEvents';

function KalendarJs() {

  useEffect(() => {
    // Setting to today's date
    store.dispatch(setSelectedDate(new Date()))

    // Fetching events
    Api.getEvents().then((res) => {
      store.dispatch(setUserEvents(res))
    })
  }, []);

  return (
    <div className="KalendarJs">
      <Provider store={store}>
        <SidePanel />
        <ConnectedMainPanel />
      </Provider>
    </div>
  );
}

export default KalendarJs;
