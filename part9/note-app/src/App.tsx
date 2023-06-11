import { useState, useEffect } from 'react';
import { Note } from './types'
import { getAllNotes, createNote } from './noteService'

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: 'testing' }
  ]);
  const [newNote, setNewNote] = useState('');

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createNote({content: newNote}).then(savedNotes => setNotes(notes.concat(savedNotes)));

    setNewNote('')
  };

  useEffect(() => {
    getAllNotes().then(notes => setNotes(notes))
  }, [])

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)} 
        />
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </div>
  )
}

export default App;