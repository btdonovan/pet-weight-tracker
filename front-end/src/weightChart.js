import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Chart } from "react-charts"

function WeightChart(props) {
  const { pets, modifier, units, selectedPet } = props
  var filteredPets
  if (selectedPet > 0) {
    filteredPets = pets.filter(pet => {return pet.id === Number(selectedPet)})
  } else {
    filteredPets = pets.slice()
  }
  const petData = filteredPets.map( pet => { 
    let petRow = {}
    petRow["label"] = pet.petName
    
    petRow["data"] = pet.filteredMeasurements.map ( measurement => {
      let datapoint = {}
      datapoint["x"] = new Date(measurement.measurement_datetime)
      datapoint["y"] = (measurement.weight_kg * modifier)
      return datapoint
    })
    return petRow
  })
  const data = React.useMemo(
    () => petData,
    [petData]
  )
  const series = React.useMemo(
    () => ({
      showPoints: true
    }),
    []
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left", format: d => `${d} ${units}`}
    ],
    [units]
  )

  return (
    <div style={{
      height: '400px',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Chart data={data} series={series} axes={axes} tooltip/>
    </div>
  );
}

export default WeightChart;