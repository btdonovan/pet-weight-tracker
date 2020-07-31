import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal, Button} from 'react-bootstrap'


function WeightForm(props) {
  return (
    <Modal show={props.show} onHide={props.handleCloseMeasureForm}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Measurement for {props.pet.petName}</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.handleSubmit}>
        <Modal.Body>
          <label htmlFor="newWeight">Weight in {props.units}</label>
          <input 
            type="number" 
            className="form-control"
            name="newWeight" 
            step="0.01"
            onChange={props.handleChange} 
            required={true}
            min="0"
            max="200"
          />
          <br />
          <label htmlFor="newDate">Date:</label>
          <input 
            type="date"
            className="form-control"
            name="newDate" 
            onChange={props.handleChange} 
            defaultValue={props.date}
            min={props.pet.birthday}
            required={true}/>
          <br />
          <label htmlFor="newTime">Time:</label>
          <input 
            type="time"
            className="form-control"
            name="newTime" 
            onChange={props.handleChange} 
            defaultValue={props.time}
            required={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseMeasureForm}>Close</Button>
          <Button variant="submit" onClick={props.handleSubmit}>Submit</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default WeightForm