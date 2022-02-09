import React, { useState } from 'react'

const Button = ({clickCallback, text}) =>
  <button onClick={clickCallback}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  const totalClicks = good + neutral + bad
  if (totalClicks == 0) {
    return <p>Click one of the buttons to show statistics</p>
  }
  return <table>
    <tbody>  
      <StatisticLine text="good" amount={good}/>
      <StatisticLine text="neutral" amount={neutral}/>
      <StatisticLine text="bad" amount={bad}/>
      <StatisticLine text="all" amount={totalClicks}/>
      <StatisticLine text="average" amount={good-bad}/>
      <StatisticLinePercent text="positive" amount={good/totalClicks}/>
    </tbody>
  </table>
}

const StatisticLine = ({text, amount}) => <tr><td>{text}</td><td>{amount}</td></tr>
const StatisticLinePercent = ({text, amount}) => <tr><td>{text}</td><td>{amount} %</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickCallback={() => setGood(good + 1)} text="good"/>
      <Button clickCallback={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button clickCallback={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App