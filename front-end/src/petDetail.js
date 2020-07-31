import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import WeightForm from './weightForm'
import ConfirmDelete from './confirmDelete';
import EditPet from './editPet'

// pet={pet} 
// modifier={modifier} 
// units={units} 
// deleteMeasurement={this.deleteMeasurement} 
// deletePet={this.deletePet} 
// handleCloseMeasureForm={this.handleCloseMeasureForm} 
// handleShowMeasureForm={this.handleShowMeasureForm} 
// handleChange={this.handleChange}
// handleSubmit={this.handleSubmit}
// handleShowDeletePet={this.handleShowDeletePet}
// handleCloseDeletePet={this.handleCloseDeletePet}
// handleShowDeleteMeasurement={this.handleShowDeleteMeasurement}
// handleCloseDeleteMeasurement={this.handleCloseDeleteMeasurement}
// showDeletePet={this.state.showDeletePet}
// showDeleteMeasurement={this.state.showDeleteMeasurement}
// date={this.state.date}
// time={this.state.time}
// show={this.state.showMeasureForm}
// showEditPet={this.state.showEditPet}
// handleShowEditPet={this.state.handleShowEditPet}
// handleCloseEditPet={this.state.handleCloseEditPet}

function PetDetailLine(props) {

  return (
    <tr>
      <td>
        <div onClick={props.deleteMeasurement}>
          <img
            name={props.measurement.id}
            width="20px" 
            src='https://image.flaticon.com/icons/png/512/216/216658.png' 
            alt='delete'>
          </img>
        </div>
        <ConfirmDelete show={props.showDeleteMeasurement} handleClose={props.handleCloseDeleteMeasurement} input={props.measurement} delete={props.deleteMeasurement} />
      </td>
      <td>{props.measurement.measurement_datetime}</td>
      <td>{(props.measurement.weight_kg * props.modifier).toFixed(2)}</td>
    </tr>
  )
}

function PetDetail(props) {
  return (
    <Fragment>
      
      <div className="row">
        <div className="col-12 pt-3 text-center">Birthday: {props.pet.birthday}</div>
      </div>
      <div className="row py-3">
        <div className="col-4">
          <Button name={props.pet.id} variant="danger" onClick={props.handleShowDeletePet}>Delete {props.pet.petName}</Button>
          <ConfirmDelete show={props.showDeletePet} handleClose={props.handleCloseDeletePet} input={props.pet} delete={props.deletePet} />
        </div>
        <div className="col-4 text-center">
          <Button variant="primary" onClick={props.handleShowEditPet}>Edit {props.pet.petName}</Button>
          <EditPet 
            showEditPet={props.showEditPet}
            handleCloseEditPet={props.handleCloseEditPet}
            handleEditPetSubmit={props.handleEditPetSubmit}
            pet={props.pet}
            handleChange={props.handleChange}
          />
        </div>
        <div className="col-4 text-right">
          <Button variant="primary" onClick={props.handleShowMeasureForm}>+Measurement</Button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">&times;</th>
            <th scope="col">Date</th>
            <th scope="col">{props.units}</th>
          </tr>
        </thead>
        <tbody>
          {props.pet.filteredMeasurements.map( (measurement, index) => {
            return (
              <PetDetailLine 
                key={index} 
                measurement={measurement} 
                modifier={props.modifier} 
                units={props.units} 
                deleteMeasurement={props.deleteMeasurement}
                showDeleteMeasurement={props.showDeleteMeasurement}
                handleCloseDeleteMeasurement={props.handleCloseDeleteMeasurement}
                handleShowDeleteMeasurement={props.handleShowDeleteMeasurement}
              />
            )
            })
          }
        </tbody>
      </table>
      
      <WeightForm 
        pet={props.pet} 
        handleSubmit={props.handleSubmit} 
        handleChange={props.handleChange} 
        date={props.date} 
        time={props.time} 
        units={props.units} 
        handleShowMeasureForm={props.handleShowMeasureForm} 
        handleCloseMeasureForm={props.handleCloseMeasureForm}
        show={props.show}
      />
    </Fragment>
  )
}

export default PetDetail