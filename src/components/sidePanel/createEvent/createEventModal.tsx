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

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);

  const [allDay, setAllDay] = useState<boolean>(false);

  const cancelHandler = () => {
    props.handleClose();
  }

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  let timeOptions: Array<JSX.Element>= [];
  for(let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min+=15) {
      let suffix = hour >= 12 ? 'PM': 'AM';
      let _hour = hour >= 13 ? hour-12: hour;
      let _min = min === 0 ? '00': min;
      timeOptions.push(
        <option value={hour+':'+_min}>{_hour+':'+_min+suffix}</option>
      )
    }
  }

  return (
    <React.Fragment>
      <Modal
        show={props.show}
        onHide={cancelHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
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
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
              </Form.Group>

              <Form.Group as={Col} controlId="__endDateTime">
                <Form.Label>End</Form.Label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="__startDateTime">
                <Form.Label>Start time</Form.Label>
                <Form.Control as="select">
                  {timeOptions}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="__endDateTime">
                <Form.Label>End time</Form.Label>
                <Form.Control as="select">
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
