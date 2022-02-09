import React, { useState, useEffect } from 'react'
import noteService from './services/noteService'
import './App.css' 

const ShowPerson = ({person, deletePerson}) => {
  return <p>
    {person.name}: {person.number}
    <button onClick={() => deletePerson(person)}>delete</button>
  </p>
  }

const ShowPeople = ({persons, deletePerson}) => {
  return <>
    {persons.map(person => <ShowPerson key={person.name} person={person} deletePerson={deletePerson}/>)}
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

const SuccesNotification = ({message}) => {
  if (message === null){ return null }
  console.log('heck yea', message)
  return <div className="succes">
    <p>{message}</p>
  </div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [succesMessage, setSuccesMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    const personToAdd = persons.find(person => person.name === newName)
    if (personToAdd) {
      const confirm = window.confirm(`User ${personToAdd.name} already exists, replace old information?`)
      if (confirm){
        personToAdd.name = newName
        personToAdd.number = newNumber
        noteService.update(personToAdd).then(newPerson => setPersons(person => persons.map(person => person.id === newPerson.id ? newPerson: person)))
        setSuccesWithTimeout(`Added ${newName}`)
      }
      return
    } 

    const newPerson = {
      name: newName,
      number: newNumber
    }
    noteService.create(newPerson).then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    setSuccesWithTimeout(`Added ${newName}`)
  }

  const setSuccesWithTimeout = (message) => {
    console.log('print', message)
    setSuccesMessage(message)
    setTimeout(() => setSuccesMessage(null), 5000)
  }

  const getFilteredPersons = (persons) => {
    if (searchTerm.length!==0){
      return persons.filter((person) => person.name.includes(searchTerm))
    } 
    return persons
  }

  const deletePerson = (personDel) => {
    const delFlag = window.confirm(`Would you like to delete ${personDel.name}?`)
    if (delFlag){
      noteService.remove(personDel.id).then(() => setPersons(persons.filter(person => person.id != personDel.id)))
    }
  }

  const handleNameInput = (event) => setNewName(event.target.value) 
  const handleNumberInput = (event) => setNewNumber(event.target.value)
  const handleSearchInput = (event) => setSearchTerm(event.target.value)
  
  const fetchServerData = () => {
    noteService.getAll().then(responce => setPersons(responce))
  }

  useEffect(fetchServerData, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={searchTerm} filterCallback={handleSearchInput}/>
      <SuccesNotification message={succesMessage}/>
      <h1>add a new</h1>
      <AddForm name={newName} number={newNumber}
        nameCallback={handleNameInput}
        numberCallback={handleNumberInput}
        addPersonCallback={addPerson}
      />
      <h2>Numbers</h2>
      <ShowPeople persons={getFilteredPersons(persons)} deletePerson={deletePerson}/>
    </div>
  )
}

export default App