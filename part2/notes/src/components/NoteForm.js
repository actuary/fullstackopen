import { useState } from 'react'

const NoteForm = ({ createNote, noteFormRef }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          id="note-content"
          value={newNote}
          onChange={handleChange}
        />
        <button id="create-note-button" type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
