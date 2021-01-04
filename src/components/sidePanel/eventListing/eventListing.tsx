import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Event, { EventProps } from './event';
import EventInstanceModal from '../../EventModal/EventInstanceModal';
import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';
import { UpdateOneEvent, DeleteOneEvent } from '../../../actions/Event.actions';
import { store } from './../../../store';
import Api from './../../../services/api';

import './eventListing.scss';

function EventListing(props: any) {
  const [events, setEvents] = useState<any[]>([]);

  const [editEventModalshow, setEditEventModalShow] = useState<boolean>(false);
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState<boolean>(false);

  const handleEditEventModalClose = () => setEditEventModalShow(false);
  const handleEditEventModalShow = () => setEditEventModalShow(true);

  const handleDeleteConfirmationModalClose = () => setDeleteConfirmationShow(false);
  const handleDeleteConfirmationModalShow = () => setDeleteConfirmationShow(true);

  const [editEventObj, setEditEventObj] = useState<EventProps | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventProps | null>(null);

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

  const editEventClickHandler = (event) => {
    setEditEventObj(event);
    setEditEventModalShow(true);
  }

  const deleteEventClickHandler = (event) => {
    setEventToDelete(event);
    setDeleteConfirmationShow(true);
  }

  const handleSubmitSuccess = (updatedEvent) => {
    setEditEventModalShow(false);
    store.dispatch(UpdateOneEvent(updatedEvent));
  }

  const deleteEvent = () => {
    if (eventToDelete) {
      Api.deleteEvent(eventToDelete._id!).then((results) => {
        if (results.status) {
          setDeleteConfirmationShow(false);
          store.dispatch(DeleteOneEvent(eventToDelete._id!));
        } else {
          // // Handle error within the modal
          // setHasError(true);
          // setErrorMessage(results?.error?.message);
        }
      });
    }
    
    return null;
  }

  return (
    <div className='event-listing-container'>
      {events.length > 0 && events.map((event, i) =>
        <Event
          key={i} 
          {...event}
          editEventClickHandler={() => editEventClickHandler(event)} 
          deleteEventClickHandler={() => deleteEventClickHandler(event)}
        />
      )}

      {editEventObj && (
        <EventInstanceModal
          show={editEventModalshow}
          type='edit'
          handleSubmitSuccess={handleSubmitSuccess}
          handleClose={handleEditEventModalClose}
          eventData={editEventObj}
        />
      )}

      {eventToDelete && (
        <ConfirmationModal
          show={deleteConfirmationShow}
          confirmActionHandler={deleteEvent}
          handleClose={handleDeleteConfirmationModalClose}
          actionMessage={"You're about to delete event: " + eventToDelete.title}
          confirmClickTitle={'Delete'}
          confirmClickClass={'btn-danger'}
        />
      )}

    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { store: state }
}

export default connect(mapStateToProps)(EventListing);
