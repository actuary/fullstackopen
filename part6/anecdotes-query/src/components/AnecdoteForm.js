import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const notes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', notes.concat(newAnecdote))
    },
    onError: (err) => {
      dispatch({ type: 'SHOW', payload: { message: 'too short anecdote, must have length 5 or more' } })
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

    dispatch({ type: 'SHOW', payload: { message: `you have added '${content}'` }})
    setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
