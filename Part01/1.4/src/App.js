import React from 'react'

const Header = (props) => {
  console.log(props.course)
 return <h1>
   {props.course}
 </h1>
}

const Content = (props) => {
  console.log(props.parts)
  return <p>
    {props.parts.map(info => <div> {info.name} {info.exercises} </div> )}
  </p>
}

const Total = (props) => {
  console.log(props.parts)
  const sum=props.parts.reduce((x,y) => x=x+y.exercises,0)
  return <p>
    Total exercises: {sum}
  </p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
  )
}

export default App