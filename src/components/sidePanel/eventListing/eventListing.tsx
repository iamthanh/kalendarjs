import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Event from './event';
import EventInstanceModal from '../../EventModal/EventInstanceModal';
import './eventListing.scss';

function EventListing(props: any) {
  const [events, setEvents] = useState<any[]>([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editEventObj, setEditEventObj] = useState<Object | null>(null);

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

  const eventClickHandler = (event) => {
    setEditEventObj(event);
    setShow(true);
  }

  return (
    <div className='event-listing-container'>
      {events.length > 0 && events.map((event, i) =>
        <Event clickHandler={() => eventClickHandler(event)} key={i} {...event} />
      )}

      {editEventObj && (
        <EventInstanceModal
          show={show}
          type='edit'
          handleNewEventSuccess={() => { }}
          handleClose={handleClose}
          eventData={editEventObj}
        />
      )}

    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { store: state }
}

export default connect(mapStateToProps)(EventListing);
