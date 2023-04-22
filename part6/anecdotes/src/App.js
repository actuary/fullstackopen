import AnecdoteList from "./components/Anecdotes"
import AnecdoteFilter from "./components/AnecdoteFilter"
import NewAnecdote from "./components/NewAnecdote"
import Notification from "./components/Notification"

const App = () => {
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
