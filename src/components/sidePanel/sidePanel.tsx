import React, { useState } from 'react';
import './sidePanel.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SelectedDate from './selectedDate/selectedDate';
import EventListing from './eventListing/eventListing';
import CreateEventModal from './createEvent/createEventModal';

function SidePanel() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="side-panel">
      <div className="header">KalendarJS</div>
      <SelectedDate />
      <div className=''>
        <Button variant="primary" onClick={handleShow}>Create event</Button>
      </div>
      <EventListing />
      
      <CreateEventModal 
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}

export default SidePanel;
