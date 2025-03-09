import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {    
    console.log('effect')    
    axios      
      .get('http://localhost:3001/persons')      
      .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response.data)      
      })  
    }, [])  
      
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newPerson,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: persons.length + 1,
    }

    setPersons(persons.concat(noteObject))
    setNewPerson('')
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.important)

  return (
    <div>
      <h1>Persons</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {personsToShow.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
      <form onSubmit={addPerson}>
        <input
          value={newPerson}
          onChange={handlePersonChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App