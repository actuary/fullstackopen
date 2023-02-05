import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const vote = (idx) => {
    const tmp = [...votes]
    tmp[idx] += 1
    setVotes(tmp)
  }

  const mostVotes = (votes) => (
    votes.reduce((idx, val, i, arr) => val > arr[idx] ? i : idx, 0)
  )

  const randInt = (lo, hi) => (Math.floor(Math.random() * (hi - lo) + lo))

  return (
    <div>
      <p>Anecdote of the day</p>
      <p>"{anecdotes[selected]}"</p>
      <p>has {votes[selected]} votes.</p>
      <button onClick={() => vote(selected)}>Vote</button>
      <button onClick={() => setSelected(randInt(0, anecdotes.length))}>Click</button>
      <p>Anecdote with the most votes</p>
      <p>"{anecdotes[mostVotes(votes)]}"</p>
      <p>has {votes[mostVotes(votes)]} votes.</p>
    </div>
  )
}

export default App
