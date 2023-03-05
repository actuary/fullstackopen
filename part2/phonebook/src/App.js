import { useState, useEffect } from 'react'
import personService from './services/phonebooks'

const Notification = ({ message, color }) => {
  console.log(message)
  console.log(message.message)
  if (message === null) {
    return null
  }

  return (
    <div className={message.color}>
      {message.message}
    </div>
  )
}

const filterPersons = (persons, name) => (
  [...persons.filter(person => 
        person.name.toLowerCase().startsWith(name.toLowerCase()))]
)

const Search = ({ persons, setFiltered }) => {
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setFiltered(filterPersons(persons, event.target.value))
  }

  return (
    <div>
      filter shown with <input value={newSearch} onChange={handleSearchChange} />
    </div>
  )
}

const Add = ({ persons, setPersons, filtered, setFiltered }) => {
  const handleNameInput = (event) => (setNewName(event.target.value))
  const handleNumberInput = (event) => (setNewNumber(event.target.value))

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  const handleSubmit = (event) => {
    event.preventDefault() 

    const toAdd = { name: newName, number: newNumber }
    if (persons.every(person=>toAdd.name !== person.name)) {
      console.log(`Adding ${newName}`)
      personService.create(toAdd)
        .then(newPerson => {
          console.log(`Adding ${newName}`)
          setErrorMessage(
            { 
              message: `Added '${newPerson.name}' to server.`,
              color: 'success'
            }
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons([...persons, newPerson])
          setFiltered([...filtered, newPerson])
        }).catch(error => {
          console.log("error")
          setErrorMessage(
            { 
              message: error.response.data.error,
              color: 'error'
            }
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          console.log(error)
        })
    } else if (window.confirm(`Are you sure you want to change ${newName}'s number`)) {
      const person = persons.find(p => p.name === newName)
      personService.update(person.id, toAdd)
        .then(newPerson => {
          const updatedPersons = [...persons.filter(person => person.name !== toAdd.name), newPerson]
          setPersons(updatedPersons)
        })
        .catch(_ => {
          setErrorMessage(
            { 
              message: `Information of '${person.name}' has already been removed from server`,
              color: 'error'
            }
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    }
    setNewName('')
  }

  return (
    <>
      <h2>Add a new number</h2>
      { errorMessage === null ? <></> : <Notification message={errorMessage} />}
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Numbers = ({ persons, setFiltered }) => {
  const handleRemoveClick = (id) => {
    console.log(id)
    personService
      .remove(id)
      .then(_ => {
        setFiltered(persons.filter(person => person.id !== id))
      })

  }

  return (
    <>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map(({ name, number, id })=>
            <tr key={id}>
              <td>{name}</td>
              <td>{number}</td>
              <td><button onClick={() => handleRemoveClick(id)}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
        setFiltered(persons)
      })
  }, [])

  const [filtered, setFiltered] = useState([])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search persons={persons} setFiltered={setFiltered}/>
      <Add persons={persons} setPersons={setPersons} filtered={filtered} setFiltered={setFiltered}/>
      <Numbers persons={filtered} setFiltered={setFiltered}/>
    </div>
  )
}

export default App
