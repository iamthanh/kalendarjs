import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import Api from './../../../services/api';

import "react-datepicker/dist/react-datepicker.css";

type createEventModal = {
  show: boolean,
  handleNewEventSuccess: Function,
  handleClose: Function
}

function CreateEventModal(props: createEventModal) {

  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date>(new Date());
  const [allDay, setAllDay] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [validated, setValidated] = useState<boolean>(false);

  const cancelHandler = () => {
    props.handleClose();
  }

  const setTimeHandler = (setter, time: string) => {
    let _time = time.split(':');

    // Update the start time to the selected time
    setter(time => {
      time.setMinutes(parseInt(_time[1]));
      time.setHours(parseInt(_time[0]));
      return new Date(time)
    })
  }

  const submitHandler = (event) => {

    event.preventDefault();
    event.stopPropagation();

    let data = {
      'title': title,
      'description': description,
      'startDateTime': startDateTime,
      'endDateTime': endDateTime,
      'allDay': allDay
    }

    Api.createNewEvent(data).then((results) => {
      if (results.status) {
        props.handleNewEventSuccess(results.data);
      } else {
        // Handle error within the modal
      }
    });
  }

  const inputHandler = (event, setter) => {
    if (event.target.value.length) {
      setter(event.target.value);
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={cancelHandler}
      backdrop="static"
      keyboard={false}
    >
      <Form onSubmit={submitHandler}>

        <Modal.Header closeButton={false}>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="__title">
            <Form.Control size="sm" type="text" placeholder="Enter the title" required onChange={e=>inputHandler(e, setTitle)} />
            <Form.Control.Feedback type="invalid">
              Please provide a title
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="__description">
            <Form.Control size="sm" as="textarea" rows={4} placeholder="Description" onChange={e=>inputHandler(e, setDescription)} />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="__startDateTime">
              <Form.Label>Start</Form.Label>
              <DatePicker selected={startDateTime} onChange={date => setStartDateTime(date)} />
            </Form.Group>

            <Form.Group as={Col} controlId="__endDateTime">
              <Form.Label>End</Form.Label>
              <DatePicker selected={endDateTime} onChange={date => setEndDateTime(date)} />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="__allDay">
            <Form.Check type="checkbox" label="All day" defaultChecked={allDay} onChange={e => setAllDay(e.target.checked)} />
          </Form.Group>

          {!allDay && (
            <Form.Row>
              <Form.Group as={Col} controlId="__startDateTime">
                <Form.Label>Start time</Form.Label>
                <TimePicker
                  onChange={v => setTimeHandler(setStartDateTime, v)}
                  value={startDateTime}
                  clockIcon={null}
                  clearIcon={null}
                  disableClock={true}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="__endDateTime">
                <Form.Label>End time</Form.Label>
                <TimePicker
                  onChange={v => setTimeHandler(setEndDateTime, v)}
                  value={endDateTime}
                  clockIcon={null}
                  clearIcon={null}
                  disableClock={true}
                />
              </Form.Group>
            </Form.Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => cancelHandler()}>Cancel</Button>
          <Button variant="primary" type='submit'>Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateEventModal;
