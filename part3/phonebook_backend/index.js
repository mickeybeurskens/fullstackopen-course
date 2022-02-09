const { request } = require("express")
const express = require("express")
const cors = require("cors")
const Person = require('./models/mongo')
var morgan = require('morgan')
const app = express()

morgan.token('person', function getPerson (request) {
    return request.method === 'POST' ? JSON.stringify(request.body) : null
})
  
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())
app.use(express.static('build'))

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

const handleNoNumber = (person, response) => {
    return response.status(404).json({
        error: `Number for person: ${person.number} is not a valid number`
    })
}

app.get('/', (request, response) => {
    response.send('Hi')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {  
        response.json(result)
    })
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    if (person.name){
        if (!person.number){
            return handleNoNumber(person, response)
        }
        const newPerson = new Person({
            name: person.name,
            number: person.number,
            date: new Date().toString(),
        })
        newPerson.save().then(result => {
            response.send(result)
        })
        return
    }
    return response.status(404).json({
        error: `Data ${person} in body should contain a 'name' attribute`
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => { 
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        response.status(500).end()
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Object(request.params.id)
    Person.deleteOne({ _id: id}).then(person =>{
        response.status(204).end()
    }).catch(error => {
        response.status(500).end()
    })
})

app.get('/info', (request, response) => {
    response.send(InfoPage())
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})