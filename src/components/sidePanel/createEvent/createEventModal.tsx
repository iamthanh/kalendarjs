import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { time } from 'console';

type createEventModal = {
  show: boolean,
  handleClose: Function
}

function CreateEventModal(props: createEventModal) {

  const now = new Date();
  const [startDateTime, setStartDateTime] = useState<Date>(now);
  const [endDateTime, setEndDateTime] = useState<Date>(now);

  const [allDay, setAllDay] = useState<boolean>(false);

  useEffect(() => {
    if (now.getMinutes() < 15) {
      setStartDateTime(time => new Date(time.setMinutes(15)))
      setEndDateTime(time => new Date(time.setMinutes(30)))
    } else if (now.getMinutes() < 30) {
      setStartDateTime(time => new Date(time.setMinutes(30)))
      setEndDateTime(time => new Date(time.setMinutes(45)))
    } else if (now.getMinutes() < 45) {
      setStartDateTime(time => new Date(time.setMinutes(45)))
      setEndDateTime(time => new Date(time.setMinutes(60)))
    } else {
      setStartDateTime(time => new Date(time.setMinutes(60)))
      setEndDateTime(time => {
        time.setMinutes(15);
        time.setHours(time.getHours()+1);
        return new Date(time)
      })
    }
  }, [])

  const cancelHandler = () => {
    props.handleClose();
  }

  console.log(startDateTime)
  console.log(endDateTime)

  useEffect(() => {
    console.log(startDateTime);
  }, [startDateTime]);

  let timeOptions: Array<JSX.Element> = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 15) {
      let suffix = hour >= 12 ? 'PM' : 'AM';


      let _hour = hour >= 13 ? hour - 12 : hour;
      let _min = min === 0 ? '00' : min;

      let selected = _hour === startDateTime.getHours() && min === startDateTime.getMinutes() ? true : false;

      timeOptions.push(
        <option selected={selected} value={hour + ':' + _min}>{_hour + ':' + _min + suffix}</option>
      )
    }
  }

  const startTimeHandler = (time:string) => {
    let _time = time.split(':');
    console.log(_time);
    setStartDateTime(time => {
      time.setMinutes(parseInt(_time[1]));
      time.setHours(parseInt(_time[0]));

      console.log(time);

      return new Date(time)
    })
  }

  return (
    <React.Fragment>
      <Modal
        show={props.show}
        onHide={cancelHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group controlId="__title">
              <Form.Control size="sm" type="text" placeholder="Enter the title" />
            </Form.Group>

            <Form.Group controlId="__description">
              <Form.Control as="textarea" rows={4} placeholder="Description" />
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

            <Form.Row>
              <Form.Group as={Col} controlId="__startDateTime">
                <Form.Label>Start time</Form.Label>
                <Form.Control size="sm" as="select" value={startDateTime.getHours() + ':' + startDateTime.getMinutes()} onChange={e => startTimeHandler(e.target.value)}>
                  {timeOptions}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="__endDateTime">
                <Form.Label>End time</Form.Label>
                <Form.Control size="sm" as="select" value={endDateTime.getHours() + ':' + endDateTime.getMinutes()}>
                  {timeOptions}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => cancelHandler()}>Cancel</Button>
          <Button variant="primary">Create</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default CreateEventModal;
