import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import WeightChart from './weightChart'
import PetDetail from './petDetail'
import moment from 'moment'
import NewPet from './newPet';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pets: [],
      isLoading: false,
      error: null,
      metric: true,
      date: moment().format("YYYY-MM-DD"),
      time: moment().format("HH:mm"),
      chartRange: "0",
      showNewPetForm: false,
      showMeasureForm: false,
      showDeletePet: false,
      showDeleteMeasurement: false,
      showEditPet: false,
      selectedPet: "0",
    }
    // this.fetchPets = this.fetchPets.bind(this)
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.petFetch = this.petFetch.bind(this)
    this.deleteMeasurement = this.deleteMeasurement.bind(this)
    this.handleNewPetSubmit = this.handleNewPetSubmit.bind(this)
    this.handleClosePetForm = this.handleClosePetForm.bind(this)
    this.handleShowPetForm = this.handleShowPetForm.bind(this)
    this.handleShowMeasureForm = this.handleShowMeasureForm.bind(this)
    this.handleCloseMeasureForm = this.handleCloseMeasureForm.bind(this)
    this.deletePet = this.deletePet.bind(this)
    this.handleShowDeletePet = this.handleShowDeletePet.bind(this)
    this.handleCloseDeletePet = this.handleCloseDeletePet.bind(this)
    this.handleShowDeleteMeasurement = this.handleShowDeleteMeasurement.bind(this)
    this.handleCloseDeleteMeasurement = this.handleCloseDeleteMeasurement.bind(this)
    this.handleShowEditPet = this.handleShowEditPet.bind(this)
    this.handleCloseEditPet = this.handleCloseEditPet.bind(this)
    this.handleEditPetSubmit = this.handleEditPetSubmit.bind(this)
  }

  handleShowEditPet() {
    this.setState({showEditPet: true})
  }
  handleCloseEditPet() {
    this.setState({showEditPet: false})
  }

  handleShowDeletePet() {
    this.setState({showDeletePet: true})
  }
  handleShowDeleteMeasurement() {
    this.setState({showDeleteMeasurement: true})
  }

  handleCloseDeletePet() {
    this.setState({showDeletePet: false})
  }
  handleCloseDeleteMeasurement() {
    this.setState({showDeleteMeasurement: false})
  }

  handleShowPetForm() {
    this.setState({showNewPetForm: true})
  }
  handleClosePetForm() {
    this.setState({showNewPetForm: false})
  }

  handleShowMeasureForm() {
    this.setState({showMeasureForm: true})
  }
  handleCloseMeasureForm() {
    this.setState({showMeasureForm: false})
  }

  async deletePet(event) {
    event.preventDefault()
    let id = event.target.name
    await fetch(`http://localhost:8080/pets/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'delete',
    }).then((response) => response.json())
      .then(json => {
        this.setState({
          selectedPet: 0,
          showDeletePet: false,
        })
      })
    await this.petFetch()
  }

  async deleteMeasurement(event) {
    event.preventDefault()
    let id = event.target.name
    await fetch(`http://localhost:8080/pet/0/measurements/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'delete',
    }).then((response) => response.json())
      .then(json => {
        this.setState({
          showDeleteMeasurement: false,
        })
      })
    await this.petFetch()
  }

  async handleEditPetSubmit(event) {
    event.preventDefault()
    let petID = event.target.name
    let editPet = {}
    if (this.state.editPetName) {
      editPet.petName = this.state.editPetName
    }
    if (this.state.editPetBirthday) {
      editPet.birthday = this.state.editPetBirthday
    }
    await fetch(`http://localhost:8080/pets/${petID}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(editPet),
    }).then((response) => response.json())
    .then(json => this.setState({
      showEditPet: false,
      editPetBirthday: undefined,
      editPetName: undefined,
    }))
    .catch((error) => console.log(error.message))
    await this.petFetch();
  }
  async handleNewPetSubmit(event) {
    event.preventDefault()
    let newPet = {
      petName: this.state.newPetName,
      birthday: this.state.newPetBirthday
    }
    await fetch('http://localhost:8080/pets', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(newPet),
    }).then((response) => response.json())
    .then(json => this.setState({
      showNewPetForm: false
    }))
    await this.petFetch();
  }
  async handleSubmit(event) {
    event.preventDefault()    
    let date = this.state.newDate || this.state.date
    let time = this.state.newTime || this.state.time
    let modifier
    if (this.state.metric) {
      modifier = 1
    } else {
      modifier = 2.2046
    }
    let newMeasurement = {
      measurement_datetime: date + " " + time + ":00",
      weight_kg: (this.state.newWeight / modifier),
    }
    await fetch(`http://localhost:8080/pet/${this.state.selectedPet}/measurements`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(newMeasurement),
    }).then((response) => response.json())
    .then(json => this.setState({
      save: json,
      isLoading: false,
      // selectedPet: 0,
      newDate: undefined,
      newTime: undefined,
      showMeasureForm: false
    }))
    .catch(error => this.setState({ error }))
    
    await this.petFetch()
  }

  handleChange(event) {
    let target = event.target
    let name = target.name
    let value = target.value
    this.setState({
      [name]: value,
    })
  }

  handleUnitChange() {
    this.setState({
      metric: !this.state.metric
    })
  }

  async petFetch() {
    this.setState({ isLoading: true })
    await fetch('http://localhost:8080/pets')
    .then(response => response.json())
    .then(json => this.setState({
      pets: json,
      isLoading: false
    }))
    .catch(error => this.setState({ error, isLoading: false }))
  }

  componentDidMount() {
    this.petFetch()
  }


  render() {

    const { pets, isLoading, error, metric, selectedPet } = this.state;
    
    if (this.state.chartRange !== "0") {
      var filterDate = moment().subtract(Number(this.state.chartRange), "months")
      pets.forEach( pet => {
        pet.filteredMeasurements = pet.measurements.filter( measurement => {
          return moment(measurement.measurement_datetime).isSameOrAfter(filterDate)
        })
      })
    } else {
      pets.forEach( pet => {
        pet.filteredMeasurements = pet.measurements.slice()
      })
    }

    if (error) {
      return <p>{error.message}</p>
    }
    if (isLoading) {
      return <p>Loading...</p>
    }

    var units
    var modifier
    if (this.state.metric) {
      units = "KGs"
      modifier = 1.0
    } else {
      units = "Lbs"
      modifier = 2.2046
    }
    var petDetail
    if (this.state.selectedPet > 0) {
      let pet = pets.filter( pet => (pet.id === Number(this.state.selectedPet)) )[0]
      
      petDetail = (
        <div>
          <PetDetail 
            pet={pet} 
            modifier={modifier} 
            units={units} 
            deleteMeasurement={this.deleteMeasurement} 
            deletePet={this.deletePet} 
            handleCloseMeasureForm={this.handleCloseMeasureForm} 
            handleShowMeasureForm={this.handleShowMeasureForm} 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleShowDeletePet={this.handleShowDeletePet}
            handleCloseDeletePet={this.handleCloseDeletePet}
            handleShowDeleteMeasurement={this.handleShowDeleteMeasurement}
            handleCloseDeleteMeasurement={this.handleCloseDeleteMeasurement}
            showDeletePet={this.state.showDeletePet}
            showDeleteMeasurement={this.state.showDeleteMeasurement}
            date={this.state.date}
            time={this.state.time}
            show={this.state.showMeasureForm}
            showEditPet={this.state.showEditPet}
            handleShowEditPet={this.handleShowEditPet}
            handleCloseEditPet={this.handleCloseEditPet}
            handleEditPetSubmit={this.handleEditPetSubmit}
          />
        </div>)
    } else {
      petDetail = (<div></div>)
    }
    var petName
    
    if (pets.length > 0) {
      if (this.state.selectedPet === "0" || !this.state.selectedPet) {
        petName = "All Pets"
      } else {
        petName = pets.filter(pet => pet.id === Number(this.state.selectedPet))[0].petName
      }
      
      return (
        <div className="container pt-3">
          <div className="row">
            <div className="col-12 text-center">
              <h3 className="text-center">Weights for {petName}</h3>
            </div>
          </div>
          <div className="row pr-4">
            <div className="col-12">
              <WeightChart pets={pets} units={units} modifier={modifier} selectedPet={selectedPet} />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-2"></div>
            <div className="col-2">
              <div className="checkbox">
                <label className="checkbox-inline">
                <input type='checkbox' name='metric' onChange={this.handleUnitChange} checked={this.state.metric}/>
                Metric
                </label>
              </div>
            </div>
            <div className="col-7">
              <div className="radio">
                <label className="radio-inline px-2">
                  <input
                    type="radio"
                    name="chartRange"
                    value={0}
                    checked={this.state.chartRange === "0"}
                    onChange={this.handleChange}
                  />
                  All Time
                </label>
                <label className="radio-inline px-2">
                  <input
                    type="radio"
                    name="chartRange"
                    value={3}
                    checked={this.state.chartRange === "3"}
                    onChange={this.handleChange}
                  />
                  3 Months
                </label>
                <label className="radio-inline px-2">
                  <input
                    type="radio"
                    name="chartRange"
                    value={6}
                    checked={this.state.chartRange === "6"}
                    onChange={this.handleChange}
                  />
                  6 Months
                </label>
                <label className="radio-inline px-2">
                  <input
                    type="radio"
                    name="chartRange"
                    value={12}
                    checked={this.state.chartRange === "12"}
                    onChange={this.handleChange}
                  />
                  1 year
                </label>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-2">
              <label htmlFor="selectedPet">For Pet:</label>
            </div>
            <div className="col-4">
              <select className="form-control" name="selectedPet" onChange={this.handleChange} value={this.state.selectedPet}>
                <option value={0}>All</option>
                {pets.map((pet, index) => <option key={index} value={pet.id} >{pet.petName}</option>)}
              </select>
            </div>
            <div className="col-2">
              <Button variant="primary" onClick={this.handleShowPetForm}>+Pet</Button>
            </div>
            <div className="col-2"></div>
          </div>
          <NewPet handleChange={this.handleChange} handleNewPetSubmit={this.handleNewPetSubmit} handleClosePetForm={this.handleClosePetForm} show={this.state.showNewPetForm} />
          <div className="row">
            <div className="col-12">{petDetail}</div>
          </div>
          
        </div>
      )
    } else {
      return (
        <NewPet handleChange={this.handleChange} handleNewPetSubmit={this.handleNewPetSubmit} handleClosePetForm={this.handleClosePetForm} show={true} />
      )

    }
  }
}

export default App;
