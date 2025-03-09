import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import FilterSearch from './components/FilterSearch'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const ids = persons.map(person => {
      return person.id;
    })

    const personObject = {
      id: Math.max(...ids) + 1,
      name: newName,
      number: newNumber
    }

    const nameExists = persons.find(i => i.name.toLowerCase()===newName.toLowerCase())
    const checkNumber = { ...nameExists}

    if(newName==='' || newNumber==='') {
      return
    } else if(nameExists && checkNumber.number===newNumber) {
      alert(`${newName} is already added to phonebook`)
    } else if(nameExists && checkNumber.number!==newNumber) {
      const ID = checkNumber.id
      const changedPerson = { ...nameExists, number: newNumber}
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(ID, changedPerson)
          .then((returnedPersons) => {
            setPersons(persons.map(i => i.id !== ID ? i : returnedPersons))
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {
            alert(`the person '${nameExists.name}' was already deleted from server`)
            setPersons(persons.filter(n => n.id !== ID))
            setNewName("")
            setNewNumber("")
          })
      }
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const namesFilter = searchName === ""
    ? persons
    : persons.filter(i => i.name.toLowerCase().includes(searchName.toLowerCase()))

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then((No_data_sent_with_request) => {
          const updatedPersons = persons.filter(i => i.id !== id)
          setPersons(updatedPersons)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterSearch input={searchName} handleSearchName={handleSearchName} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {namesFilter.map(i => <Person key={i.id} person={i} deletePerson={deletePerson} />)}
      </ul>
    </div>
  )
}

export default App