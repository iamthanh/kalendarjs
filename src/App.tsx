import React, { useState, useEffect } from 'react';
import './App.css';
import SchedulePanel from './components/schedulePanel';
import MainPanel from './components/mainPanel';
import './kalendarjs.scss';

function KalendarJs() {

  const [scheduleData, setScheduleData] = useState([]);
  const [currentDateObj, setCurrentDateObj] = useState(new Date());

  useEffect(()=> {
      const fetchData = async () => {
      }
      const setCurrentDate = () => {
      }

      fetchData();

  }, []);

  return (
    <div className="KalendarJs">
      <SchedulePanel />
      <MainPanel />
    </div>
  );
}

export default KalendarJs;
