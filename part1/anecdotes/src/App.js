import React, { useState } from 'react'

const Button = ({clickCallback, text}) =>
  <button onClick={clickCallback}>{text}</button>

const CurrentVotes = ({points, voteIndex}) => <p>has {points[voteIndex]} votes</p>

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function argMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(getRandomInt(0, anecdotes.length-1))
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const changeAnecdote = () => setSelected(getRandomInt(0, anecdotes.length-1))
  const voteForAnecdote = (voteIndex) => {
    const copy = [...points]
    copy[voteIndex] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <CurrentVotes points={points} voteIndex={selected}/>
      <p>
        <Button clickCallback={() => voteForAnecdote(selected)} text="vote"/>
        <Button clickCallback={() => changeAnecdote()} text="next anecdote"/>
      </p>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[argMax(points)]}</p>
      <CurrentVotes points={points} voteIndex={argMax(points)}/>
    </div>
  )
}

export default App