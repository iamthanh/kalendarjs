import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import DateTimePicker from 'react-datetime-picker';

type createEventModal = {
  show: boolean,
  handleClose: Function
}

function CreateEventModal(props: createEventModal) {

  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());

  const [allDay, setAllDay] = useState<boolean>(false);

  const cancelHandler = () => {
    props.handleClose();
  }

  useEffect(() => {
    console.log(typeof startDate);
  }, [startDate]);

  /**
   * title: String,
    description: String,
    startTime: String,
    endTime: String,
    allDay: Boolean,
   */

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
              <Form.Group as={Col} controlId="__startDate">
                <DateTimePicker
                  onChange={setStartDate}
                  value={startDate}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="__endDate">
                <DateTimePicker
                  onChange={setEndDate}
                  value={endDate}
                />
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
