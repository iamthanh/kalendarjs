import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SelectedDate from './selectedDate/selectedDate';
import EventListing from './eventListing/eventListing';
import EventInstanceModal from './../EventModal/EventInstanceModal';
import { store } from './../../store';
import { AddOneEvent } from '../../actions/Event.actions';

import './sidePanel.scss';

function SidePanel() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitSuccess = (newEvent) => {
    setShow(false);

    // Also update the new event locally
    store.dispatch(AddOneEvent(newEvent));
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
      <EventInstanceModal
        show={show}
        type='create'
        handleSubmitSuccess={handleSubmitSuccess}
        handleClose={handleClose}
      />
    </div>
  );
}

export default SidePanel;
