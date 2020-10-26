import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import "react-datepicker/dist/react-datepicker.css";

type createEventModal = {
  show: boolean,
  handleClose: Function
}

function CreateEventModal(props: createEventModal) {

  // const nowStart = new Date();
  // now.setMinutes(1);




  // console.log('now: ' + now);

  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date>(new Date());

  const [allDay, setAllDay] = useState<boolean>(false);

  useEffect(() => {

    // setStartDateTime(time => new Date(time.setMinutes(30)))

    // if (startDateTime.getMinutes() < 15) {
    //   setStartDateTime(time => new Date(time.setMinutes(15)))
    //   setEndDateTime(time => new Date(time.setMinutes(30)))
    // } else if (startDateTime.getMinutes() < 30) {
    //   setStartDateTime(time => new Date(time.setMinutes(30)))
    //   setEndDateTime(time => new Date(time.setMinutes(45)))
    // } else if (startDateTime.getMinutes() < 45) {
    //   setStartDateTime(time => new Date(time.setMinutes(45)))
    //   setEndDateTime(time => {
    //     time.setMinutes(startDateTime.getMinutes()+15);
    //     // time.setHours(time.getHours());
    //     return new Date(time)
    //   })
    // } else {
    //   setStartDateTime(time => new Date(time.setMinutes(60)))
    //   setEndDateTime(time => new Date(time.setMinutes(15)))
    // }

    // Setting the inital start and end times
    // setInitalTimes();
  }, [])

  const setInitalTimes = () => {

    // console.log(now);

    // setStartTime(now.getHours() + ':' + now.getMinutes());

    // console.log(now.getMinutes());
    // setEndTime(now.getHours())
  }

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

  // const endTimeHandler = (time: string) => {
  //   let _time = time.split(':');
  //   setEndDateTime(time => {
  //     time.setMinutes(parseInt(_time[1]));
  //     time.setHours(parseInt(_time[0]));

  //     // console.log?
  //     return new Date(time)
  //   })
  // }

  const submitHandler = () => {
    console.log({
      'startDateTime': startDateTime,
      'endDateTime':endDateTime,
      'allDay': allDay
    })
  }

  return (
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

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => cancelHandler()}>Cancel</Button>
        <Button variant="primary" onClick={submitHandler}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateEventModal;
