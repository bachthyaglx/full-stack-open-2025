import React from 'react'

const Header = (props) => {
  console.log(props.course)
  return <h1>{props.course.name}</h1>
}

const Part = (props) => {
  console.log(props.course)
  return <p>
    {props.course.parts.map(info => <div>{info.name} {info.exercises}</div>)}
  </p>
}

const Total = (props) => {
  console.log(props.course)
  const sum = props.course.parts.reduce((x,y) => x=x+y.exercises,0)
  return <p>Number of exercises {sum}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Part course={course} />
      <Total course={course}/>
    </div>
  )
}

export default App