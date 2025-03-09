import React from 'react'

const Header = ({course}) => {
 return (
     <div>
         <h1>{course.name}</h1>
     </div>
 )
}

const Total = ({course}) => {
  const sum = course.parts.reduce(
    (firstValue, lastValue) => firstValue + lastValue.exercises,0)
  return <b>Total of {sum} exercises</b>;
};

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            {course.parts.map((info, id) => <p key={id}> {info.name} {info.exercises} </p>)}
            <Total course={course}/>
        </div>
    )
}

export default Course