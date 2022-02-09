const { response } = require("express")
const express = require("express")
const app = express()

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Oden",
        "number": "wa-no-ku-ni",
        "id": 5
    }
]

const InfoPage = () => {
    const infoString = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`
    return infoString
}

app.get('/', (request, response) => {
    response.send('Hi')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person){
        response.json(person)
        return
    }
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(InfoPage())
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})