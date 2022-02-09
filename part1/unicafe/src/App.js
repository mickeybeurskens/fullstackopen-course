import React, { useState } from 'react'

const Button = ({clickCallback, text}) =>
  <button onClick={clickCallback}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  const totalClicks = good + neutral + bad
  if (totalClicks == 0) {
    return <p>Click one of the buttons to show statistics</p>
  }
  return <>
    <Result text="good" amount={good}/>
    <Result text="neutral" amount={neutral}/>
    <Result text="bad" amount={bad}/>
    <Result text="all" amount={totalClicks}/>
    <Result text="average" amount={good-bad}/>
    <ResultPercent text="positive" amount={good/totalClicks}/>
  </>
}

const Result = ({text, amount}) => <p>{text} {amount}</p>
const ResultPercent = ({text, amount}) => <p>{text} {amount} %</p>

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