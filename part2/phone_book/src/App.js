import React, { useState } from 'react'

const ShowPerson = ({person}) => <p>{person.name}: {person.number}</p>

const ShowPeople = ({persons}) => {
  return <>
    {persons.map(person => <ShowPerson key={person.name} person={person}/>)}
  </>
}


const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '0623456621'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const handleNameInput = (event) => setNewName(event.target.value) 
  const handleNumberInput = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}>
        <div>name: <input value={newName} onChange={handleNameInput}/></div>
        <div>phone number: <input value={newNumber} onChange={handleNumberInput}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowPeople persons={persons}/>
    </div>
  )
}

export default App