import { useState } from 'react'

const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, value}) => {
  if(text==="positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const ClickGood = () => {
    setGood(good + 1)
  }

  const ClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const ClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={ClickGood} text='Good' />
      <Button handleClick={ClickNeutral} text='Neutral' />
      <Button handleClick={ClickBad} text='Bad' />
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good+neutral+bad} />
        <StatisticLine text="average" value={(good*1+neutral*0+bad*-1)/(good+neutral+bad)} />
        <StatisticLine text="positive" value={(good*100)/(good+neutral+bad)} />
      </table>
    </div>
  )
}

export default App

