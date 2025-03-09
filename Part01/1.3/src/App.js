import React from 'react'

const Header = (props) => {
  console.log(props.course)
  return  <h1>{props.course}</h1>
}

const Part1 = (props) => {
  console.log(props.part1)
  return <div>{props.part1.name} {props.part1.exercises}</div>
}

const Part2 = (props) => {
  console.log(props.part2)
  return <div>{props.part2.name} {props.part2.exercises}</div>
}

const Part3 = (props) => {
  console.log(props.part3)
  return <div>{props.part3.name} {props.part3.exercises}</div>
}

const Total = (props) => {
  const sum = props.part1.exercises + props.part2.exercises + props.part3.exercises
  console.log(sum)
  return <p>Number of exercises: {sum}</p>
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Part1 part1={part1}/>
      <Part2 part2={part2}/>
      <Part3 part3={part3}/>
      <Total part1={part1} part2={part2} part3={part3}/>
    </div>
  )
}

export default App