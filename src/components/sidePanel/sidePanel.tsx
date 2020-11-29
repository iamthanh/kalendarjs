import React, { useState } from 'react';
import './sidePanel.scss';
import Button from 'react-bootstrap/Button';
import SelectedDate from './selectedDate/selectedDate';
import EventListing from './eventListing/eventListing';
import CreateEventModal from './createEvent/createEventModal';
import { store } from './../../store';
import { addEvent } from './../../actions/userEvents';

function SidePanel() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewEventSuccess = (newEvent) => {
    console.log('event created successfully');
    setShow(false);

    // Also update the new event locally
    store.dispatch(addEvent(newEvent));
  }

  return (
    <div className="side-panel">
      <div className="header">
        <div className="logo">KalendarJS</div>
        <SelectedDate />
        <div className='create-event-button-container'>
          <Button size="sm" variant="outline-primary" onClick={handleShow}>Create event</Button>
        </div>
      </div>
      <EventListing />

      <CreateEventModal
        show={show}
        handleNewEventSuccess={handleNewEventSuccess}
        handleClose={handleClose}
      />
    </div>
  );
}

export default SidePanel;
