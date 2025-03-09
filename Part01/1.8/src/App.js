import React, { useState } from 'react'

// a proper place to define a component
const Statistics = (props) => {
  const average=((props.good-props.bad)/(props.good+props.neutral+props.bad)).toFixed(2)
  const positive=((props.good/(props.good+props.neutral+props.bad))*100).toFixed(2)
  if(props.good>0 || props.neutral>0 || props.bad>0) {
    return <div>good {props.good}<br/>
      neutral {props.neutral}<br/>
      bad {props.bad}<br/>
      average {average}<br/>
      positive {positive} %
    </div>
  }
  else {
    return null
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  /*
  // do not define a component within another component
  const Statistics = (props) => {
    // ...
  }
   */

  return (
      <div>
        <h1>Give feedback</h1>
        <button onClick={()=>setGood(good+1)}>good</button>
        <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
        <button onClick={()=>setBad(bad+1)}>bad</button>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  )
}

export default App