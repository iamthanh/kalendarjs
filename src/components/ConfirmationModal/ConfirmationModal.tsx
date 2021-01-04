import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ConfirmationModalProps {
  show: boolean,
  confirmActionHandler: Function,
  handleClose: Function,
  actionMessage: string
  confirmClickTitle: string,
  confirmClickClass?: string
}

function ConfirmationModal (props: ConfirmationModalProps) {

  const cancelHandler = () => {
    props.handleClose();
  }

  if (!props.actionMessage.length) return null;

  return (
    <>
      <Modal 
        show={props.show} 
        onHide={() => cancelHandler()} 
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.actionMessage}</Modal.Body>
        <Modal.Footer>
          <Button size='sm' variant="secondary" onClick={() => cancelHandler()}>
            Close
          </Button>
          <Button 
            size='sm'
            className={props.confirmClickClass ? props.confirmClickClass : ''}            
            onClick={() => props.confirmActionHandler()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const MemoizedConfirmationModal = React.memo(ConfirmationModal);
export default MemoizedConfirmationModal
