import React from 'react'

const Course = ({courses}) => {
  return (
    <div>
      <h1>Wed development curriculum</h1>
      <h2>{courses[0].name}</h2>
      {courses[0].parts.map((info, id) => <p key={id}> {info.name} {info.exercises} </p>)}
      <b>Total of {courses[0].parts.reduce((firstValue, lastValue) => firstValue + lastValue.exercises,0)} courses </b>
      <h2>{courses[1].name}</h2>
      {courses[1].parts.map((info, id) => <p key={id}> {info.name} {info.exercises} </p>)}
      <b>Total of {courses[1].parts.reduce((firstValue, lastValue) => firstValue + lastValue.exercises,0)} courses </b>      
      </div>
  )
}

export default Course