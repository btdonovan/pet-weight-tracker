import React from 'react'
import {Modal, Button} from 'react-bootstrap'

function ConfirmDelete(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You are about to delete the following:</p>
        <p>{props.input.petName || props.input.measurement_datetime}</p>
        <p>This cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
        <Button name={props.input.id} variant="danger" onClick={props.delete}>Delete!</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmDelete