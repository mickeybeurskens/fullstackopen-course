import React, { useState } from 'react'

const ShowPerson = ({person}) => <p>{person.name}: {person.number}</p>

const ShowPeople = ({persons}) => {
  return <>
    {persons.map(person => <ShowPerson key={person.name} person={person}/>)}
  </>
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const AddPerson = (event) => {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Filter: <input value={searchTerm} onChange={handleSearchInput}/></p>
      <h1>add a new</h1>
      <form onSubmit={AddPerson}>
        <div>name: <input value={newName} onChange={handleNameInput}/></div>
        <div>phone number: <input value={newNumber} onChange={handleNumberInput}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowPeople persons={getFilteredPersons(persons)}/>
    </div>
  )
}

export default App