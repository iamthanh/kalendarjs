import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import Api from './../../services/api';
import Alert from 'react-bootstrap/Alert'
import "react-datepicker/dist/react-datepicker.css";

interface EventDataInterface {
  title: string,
  description: string,
  startDateTime: Date,
  endDateTime: Date,
  allDay: boolean,
  id?: string | null
}

interface EventInstanceModalProps {
  show: boolean,
  type: string,
  handleSubmitSuccess: Function,
  handleClose: Function,
  eventData?: any
}

const MODAL_TYPE_CREATE = 'create';
const MODAL_TYPE_EDIT = 'edit';
const MODAL_VALID_TYPES = [MODAL_TYPE_CREATE, MODAL_TYPE_EDIT];

function EventInstanceModal(props: EventInstanceModalProps) {
  const [modalType, setModalType] = useState<string | null>(null);

  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date>(new Date());
  const [allDay, setAllDay] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Init, setting up the modal type
  useEffect(() => {
    if (MODAL_VALID_TYPES.includes(props?.type)) {
      setModalType(props.type);
    } else {
      // modal has invalid type passed in
      console.error('Failed to instantiate EventInstanceModal', 'Invalid modal type')
    }
  }, [])

  // Init, checking if editing and existing event data is being passed in
  useEffect(() => {
    if (modalType === MODAL_TYPE_EDIT && props.eventData) {
      setTitle(props.eventData.title);
      setDescription(props.eventData.description);
      setStartDateTime(new Date(props.eventData.startDateTime));
      setEndDateTime(new Date(props.eventData.endDateTime));
      setAllDay(props.eventData.allDay)
    }
  }, [modalType, props?.eventData?._id]);

  const cancelHandler = () => {
    props.handleClose();
  }

  const submitHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let data: EventDataInterface = {
      'title': title.trim(),
      'description': description.trim(),
      'startDateTime': startDateTime,
      'endDateTime': endDateTime,
      'allDay': allDay,
      'id': props.eventData?._id ? props.eventData._id : null
    }

    if (modalType === MODAL_TYPE_CREATE) {
      handleCreateNewEvent(data);
    } else if (modalType === MODAL_TYPE_EDIT) {
      handleUpdateEvent(data);
    }
  }

  const handleCreateNewEvent = (data: EventDataInterface) => {
    Api.createNewEvent(data).then((results) => {
      setHasError(false);
      setErrorMessage('');

      if (results.status) {
        props.handleSubmitSuccess(results.data);
      } else {
        // Handle error within the modal
        setHasError(true);
        setErrorMessage(results?.error?.message);
      }
    });
  };

  const handleUpdateEvent = (data: any) => {
    Api.updateEvent(data).then((results) => {
      setHasError(false);
      setErrorMessage('');

      if (results.status) {
        props.handleSubmitSuccess(results.data);
      } else {
        // Handle error within the modal
        setHasError(true);
        setErrorMessage(results?.error?.message);
      }
    });
  };

  const inputHandler = (setter: Function, inputEvent) => {
    if (inputEvent.currentTarget.value.length) {
      setter(inputEvent.currentTarget.value);
    }
  }

  const setTimeHandler = (setter: Function, time: string) => {
    let _time = time.split(':');

    // Update the start time to the selected time
    setter(time => {
      time.setMinutes(parseInt(_time[1]));
      time.setHours(parseInt(_time[0]));
      return new Date(time)
    })
  }

  return (
    <Modal
      show={props.show}
      onHide={cancelHandler}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Form onSubmit={submitHandler}>

        <Modal.Header closeButton={false}>
          <Modal.Title>
            {modalType === MODAL_TYPE_CREATE ? 'Create event' : 'Edit event'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="__title">
            <Form.Control value={title} size="sm" type="text" placeholder="Enter the title" required onChange={e => inputHandler(setTitle, e)} />
            <Form.Control.Feedback type="invalid">
              Please provide a title
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="__description">
            <Form.Control value={description} size="sm" as="textarea" rows={4} placeholder="Description" onChange={e => inputHandler(setDescription, e)} />
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

          {hasError && (
            <Alert variant={'danger'}>{errorMessage ?? ''}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={() => cancelHandler()}>Cancel</Button>
          <Button size="sm" variant="primary" type='submit'>{modalType === MODAL_TYPE_CREATE ? 'Create' : 'Update'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

const MemoizedEventInstanceModal = React.memo(EventInstanceModal);
export default MemoizedEventInstanceModal
