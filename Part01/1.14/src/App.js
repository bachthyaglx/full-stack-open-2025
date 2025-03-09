import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const set_anecdotes = () => {
    setSelected(selected+1)
  }

  const setVote = () => {
    const copyPoints = { ...points }
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }

  const repeat = () => {
    if(selected===anecdotes.length) {
      setSelected(0)
    }
  }

  const most = () => {
    let max=0
    let save_point = 0
    for (let i in points) {
      if(max<points[i]) {
        max=points[i]
        save_point=i
      }
    }
    return <div>
      {anecdotes[save_point]}<br/>has {max} votes.
    </div>
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br/>
      <div>has {points[selected]} votes</div>
      <button onClick={() => setVote()}>vote</button>
      <button onClick={() => set_anecdotes()}>next anecdote</button>
      {repeat()}<br/>
      <h1>Anecdote with most votes</h1>
      {most()}
    </div>
  )
}

export default App