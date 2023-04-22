import { useDispatch } from "react-redux"

import { filterAnecdotes } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const updateFilter = (event) => {
    event.preventDefault()
    const searchTerm = event.target.value
    dispatch(filterAnecdotes(searchTerm))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input name="searchTerm" onChange={updateFilter}></input>
    </div>
  )
}

export default AnecdoteFilter