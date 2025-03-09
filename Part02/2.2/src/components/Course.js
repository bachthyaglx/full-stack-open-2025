import React from 'react'

const Course = ({course}) => {
    const Total = () => {
        let sum=0
        for (let i=0; i<course.parts.length; i++) {
            sum+=course.parts[i].exercises
        }
        return <b>Total of {sum} exercises</b>
    }
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map((info, id) => <p key={id}> {info.name} {info.exercises} </p>)}
            {Total()}
        </div>
    )
}

export default Course