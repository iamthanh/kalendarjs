import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './eventListing.scss';

function EventListing(props: any) {

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {

    const checkEventDaySame = (date: Date) => {
      return (
        date.getDate() === props.store.selectedDate.getDate() &&
        date.getMonth() === props.store.selectedDate.getMonth() &&
        date.getFullYear() === props.store.selectedDate.getFullYear()
      );
    }

    if (props.store.userEvents) {
      let eventsToAdd: any[] = [];

      for (let i = 0; i < props.store.userEvents.length; i++) {
        let _event = props.store.userEvents[i];
        let startDateTime = new Date(_event.startDateTime);

        if (checkEventDaySame(startDateTime)) {
          eventsToAdd.push(_event);
        }
      }
      setEvents(eventsToAdd);
    }

    if (props.store.selectedDate) {
      // Using the selected date to display events  
    }
  }, [props.store]);

  let hourChart: Array<JSX.Element> = [];
  for (let i = 0; i < 24; i++) {
    
    let hour = i+'am';
    if (i === 0) hour = '12am'
    else if (i === 12) hour = '12pm';
    else if (i > 12) hour = (i-12)+'pm'
    
    hourChart.push(
      <div className='hour-chart'>
        <div className='hour-indicator'>{hour}</div>
      </div>
    )
  }

  return (
    <div className='event-listing-container'>
      {hourChart.length > 0 && hourChart}

      {events.length > 0 &&
        <ul>
          {events.map((event, i) =>
            <li key={i}>{event.title}</li>
          )}
        </ul>
      }
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { store: state }
}

export default connect(mapStateToProps)(EventListing);
