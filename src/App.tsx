import React, { useEffect } from 'react';
import './App.css';
import SidePanel from './components/sidePanel/sidePanel';
import ConnectedMainPanel from './components/mainPanel/mainPanel';
import './kalendarjs.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from './services/api';

import { setSelectedDate } from './actions/selectedDate';
import { SetUserEvents } from './actions/Event.actions';

function KalendarJs() {

  useEffect(() => {
    // Setting to today's date
    store.dispatch(setSelectedDate(new Date()))

    // Fetching events
    Api.getEvents().then((res) => {
      store.dispatch(SetUserEvents(res))
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
