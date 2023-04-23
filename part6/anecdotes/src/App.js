import { useEffect } from 'react'

import AnecdoteList from "./components/Anecdotes"
import AnecdoteFilter from "./components/AnecdoteFilter"
import NewAnecdote from "./components/NewAnecdote"
import Notification from "./components/Notification"

import { initialiseAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(initialiseAnecdotes()) 
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App
