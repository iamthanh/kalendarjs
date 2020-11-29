import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Event from './event';
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
  }, [props.store]);

  const generateHourChart = () => {
    let hourChart: Array<JSX.Element> = [];
    let hourChartRefsToAdd: Object = {};
    for (let i: number = 0; i < 24; i++) {

      let hour = i + 'am';
      if (i === 0) hour = '12am'
      else if (i === 12) hour = '12pm';
      else if (i > 12) hour = (i - 12) + 'pm';

      hourChartRefsToAdd[i] = React.createRef();

      hourChart.push(
        <div ref={hourChartRefsToAdd[i]} key={i} className='hour-chart'>
          <div className='hour-indicator'>{hour}</div>
        </div>
      )
    }
  }

  return (
    <div className='event-listing-container'>
      {events.length > 0 && events.map((event, i) =>
        <Event key={i} {...event} />
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { store: state }
}

export default connect(mapStateToProps)(EventListing);
