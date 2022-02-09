import React, { useState } from 'react'

const ShowPerson = ({name}) => <p>{name}</p>

const ShowPeople = ({persons}) => {
  return <>
    {persons.map(person => <ShowPerson key={person.name} name={person.name}/>)}
  </>
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const AddPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
  }

  const handleNameInputChange = (event) => setNewName(event.target.value) 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange}/>
        </div>
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