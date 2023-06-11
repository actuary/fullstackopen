import { useState, useEffect } from 'react';
import { DiaryEntry } from "./types";
import { createDiaryEntry, getAllEntries } from './diaryService';

interface EntryProps {
  entry: DiaryEntry
}

const Entry = ({ entry }: EntryProps) => (
  <>
    <h3>{entry.date}</h3>
    visibility: {entry.visibility}<br/>
    weather: {entry.weather}<br/>
  </>  
)

interface ContentProps {
  entries: DiaryEntry[]
}

const Content = ({ entries }: ContentProps) => {
  return <>
    {
      entries.map( (entry, i) => <Entry key={i} entry={entry} />)
    }
  </>
}

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([ ]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [message, setErrorMessage] = useState('');

  useEffect(() => {
    getAllEntries().then(entries => setEntries(entries))
  }, [])

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiaryEntry({ date, visibility, weather, comment })
      .then(savedEntry => {
        setEntries(entries.concat(savedEntry))
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
      })
      .catch((err) => {
        setErrorMessage("Error: " + err.response.data);
        setTimeout(() => setErrorMessage(''), 2000);
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      { message ? 
        <p style={{ color: 'red'}}>{message}</p>:
        null
      }
      <form onSubmit={noteCreation}>
        date <input
          value={date}
          onChange={(event) => setDate(event.target.value)}
        /><br/>
        visibility <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        /><br/>
        weather <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        /><br/>
        comment <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        /><br/>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      <Content entries={entries} />
    </div>
  );
};

export default App;