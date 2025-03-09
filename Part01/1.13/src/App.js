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
  // const [points, setPoints] = useState({ 0: 0, 1: 3, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 })
  // const points = { 0: 0, 1: 3, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }

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

  return (
    <div>
      {anecdotes[selected]}<br/>
      <div>has {points[selected]} votes</div>
      <button onClick={() => setVote()}>vote</button>
      <button onClick={() => set_anecdotes()}>next anecdote</button>
      {repeat()}
    </div>
  )
}

export default App