import React from 'react'

const Header = ({course}) => {
  console.log(course)
  return(
    <h1>
      {course}
    </h1>
  )
}

const Parts = ({parts}) => {
  return (
    <div>
      {parts.name} {parts.exercises} <br/><br/>
    </div>
  )
}
const Content = ({parts}) => {
  return (
    <div>
      {parts.map(parts => <Parts key={parts.id} parts={parts} />)}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course;

