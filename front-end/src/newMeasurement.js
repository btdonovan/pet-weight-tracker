import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal, Button} from 'react-bootstrap'

function NewPet(props) {

  return (
    <Modal show={props.show} onHide={props.handleClosePetForm}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Pet</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleNewPetSubmit}>
        <Modal.Body>
          <label htmlFor="newPetName">Pet Name:</label>
          <input className="form-control" type="text" name="newPetName" onChange={props.handleChange} required={true} />
          <label htmlFor="newPetBirthday">Pet Birthday:</label>
          <input className="form-control" type="date" name="newPetBirthday" onChange={props.handleChange} required={true} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClosePetForm}>Close</Button>
          <Button variant="submit" onClick={props.handleNewPetSubmit}>Submit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
export default NewPet