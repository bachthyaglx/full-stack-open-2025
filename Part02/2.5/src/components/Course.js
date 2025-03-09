import React from 'react'

const Header = (props) => {
  return (
    <div>
      {props.name}
    </div>
  )
}

const Lesson = (props) => {
  return (
    <div>
      {props.parts.map(info => <p key={info.id}> {info.name} {info.exercises}</p>)}
    </div>
  )
}

const Total = (props) => {
  let sum=props.parts.reduce((firstValue,lastValue) => firstValue+lastValue.exercises,0)
  return (
    <b>
      Total of {sum} exercises
    </b>
  )
}

const Course = ({info}) => {
  return (
    <div>
      <h2>
        <Header name={info.name}/>
      </h2>
      <Lesson parts={info.parts} />
      <Total parts={info.parts}/>
      </div>
  )
}

export default Course