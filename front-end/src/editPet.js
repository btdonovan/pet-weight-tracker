import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal, Button} from 'react-bootstrap'

function EditPet(props) {

  return (
    <Modal show={props.showEditPet} onHide={props.handleCloseEditPet}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {props.pet.petName}</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleEditPetSubmit}>
        <Modal.Body>
          <label htmlFor="editPetName">Pet Name:</label>
          <input 
            className="form-control" 
            type="text" 
            name="editPetName" 
            defaultValue={props.pet.petName}
            onChange={props.handleChange} 
            required={true} 
          />
          <label htmlFor="editPetBirthday">Pet Birthday:</label>
          <input 
            className="form-control" 
            type="date" 
            name="editPetBirthday"
            defaultValue={props.pet.birthday}
            onChange={props.handleChange} 
            required={true} 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseEditPet}>Close</Button>
          <Button name={props.pet.id} variant="submit" onClick={props.handleEditPetSubmit}>Submit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
export default EditPet