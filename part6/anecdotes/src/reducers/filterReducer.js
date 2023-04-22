
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.payload.searchTerm 
    }
    default:
      return state
  }
}

export const filterAnecdotes = (searchTerm) => (
  {
    type: 'SET_FILTER',
    payload: { searchTerm }
  }
)

export default reducer