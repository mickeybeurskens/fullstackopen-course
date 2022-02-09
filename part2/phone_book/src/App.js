import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowPerson = ({person}) => <p>{person.name}: {person.number}</p>

const ShowPeople = ({persons}) => {
  return <>
    {persons.map(person => <ShowPerson key={person.name} person={person}/>)}
  </>
}

const Filter = ({term, filterCallback}) => {
  return <p>
    Filter: <input value={term} onChange={filterCallback}/>
  </p>
} 

const AddForm = ({newName, newNumber, nameCallback, numberCallback, addPersonCallback}) => {
  return <>
    <form onSubmit={addPersonCallback}>
      <div>name: <input value={newName} onChange={nameCallback}/></div>
      <div>phone number: <input value={newNumber} onChange={numberCallback}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to this phonebook silly`)
      return
    } 

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
  }

  const getFilteredPersons = (persons) => {
    if (searchTerm.length!==0){
      return persons.filter((person) => person.name.includes(searchTerm))
    } 
    return persons
  }

  const handleNameInput = (event) => setNewName(event.target.value) 
  const handleNumberInput = (event) => setNewNumber(event.target.value)
  const handleSearchInput = (event) => setSearchTerm(event.target.value)
  
  const fetchServerData = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(persons.concat(response.data)))
  }

  useEffect(fetchServerData, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={searchTerm} filterCallback={handleSearchInput}/>
      <h1>add a new</h1>
      <AddForm name={newName} number={newNumber}
        nameCallback={handleNameInput}
        numberCallback={handleNumberInput}
        addPersonCallback={addPerson}
      />
      <h2>Numbers</h2>
      <ShowPeople persons={getFilteredPersons(persons)}/>
    </div>
  )
}

export default App