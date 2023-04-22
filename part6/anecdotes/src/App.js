import AnecdoteList from "./components/Anecdotes"
import AnecdoteFilter from "./components/AnecdoteFilter"
import NewAnecdote from "./components/NewAnecdote"

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App
