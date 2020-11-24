import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function EventListing(props: any) {

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {

    const checkEventDaySame = (date:Date) => {
      return (
        date.getDate() === props.store.selectedDate.getDate() &&
        date.getMonth() === props.store.selectedDate.getMonth() &&
        date.getFullYear() === props.store.selectedDate.getFullYear()
      );
    }

    if (props.store.userEvents) {
      let eventsToAdd:any[] = [];

      for(let i = 0; i < props.store.userEvents.length; i++) {
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

  // let hourChart : Array<JSX.Element> = [];
  // for (let i = 0; i < 24; i++) {
    
  // }

  return (
    <div className='event-listing-container'>
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
