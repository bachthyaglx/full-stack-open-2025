import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Render= () => {
    if(good>0 || neutral>0 || bad>0) {
      return <div>good {good}<br/>
        neutral {neutral}<br/>
        bad {bad}<br/>
      </div>
    }
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <h1>Statistics</h1>
      <div>{Render()}</div>
    </div>
  )
}

export default App
