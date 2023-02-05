import { useState } from 'react'

const StatisticsLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ feedback }) => {
  const all = (feedback) => (
    feedback.good + feedback.neutral + feedback.bad
  )

  const total = (feedback) => (
    feedback.good - feedback.bad
  )

  const average = (feedback) => (
    (total(feedback) / all(feedback)).toFixed(1)
  )

  const positive = (feedback) => (
    (feedback.good * 100 / all(feedback)).toFixed(1).toString() + '%'
  )
  
  if (all(feedback) === 0)
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )

  return  (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine name="good" value={feedback.good}/>
          <StatisticsLine name="neutral" value={feedback.neutral}/>
          <StatisticsLine name="bad" value={feedback.bad}/>
          <StatisticsLine name="all" value={all(feedback)}/>
          <StatisticsLine name="average" value={average(feedback)}/>
          <StatisticsLine name="positive" value={positive(feedback)}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setFeedback({...feedback, good: feedback.good + 1})}>good</button>
      <button onClick={() => setFeedback({...feedback, neutral: feedback.neutral + 1})}>neutral</button>
      <button onClick={() => setFeedback({...feedback, bad: feedback.bad + 1})}>bad</button>
      <Statistics feedback={feedback}/>
    </div>
  )
}

export default App
