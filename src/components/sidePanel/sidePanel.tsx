import React, { useState } from 'react';
import './sidePanel.scss';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SchedulePanel from './schedulePanel/schedulePanel';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SelectedDate from './selectedDate/selectedDate';

function SidePanel() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="side-panel">
      <div className="header">KalendarJS</div>
      <SelectedDate />




    </div>
  );
}

export default SidePanel;
