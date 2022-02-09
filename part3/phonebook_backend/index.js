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

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    response.send('Hi')
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(result => {  
        response.json(result)
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const person = request.body
    if (person.name){
        const newPerson = new Person({
            name: person.name,
            number: person.number,
            date: new Date().toString(),
        })
        newPerson.save().then(result => {
            response.send(result)
        }).catch(error => next(error))
        return
    }
    return response.status(404).json({
        error: `Data ${person} in body should contain a 'name' attribute`
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => { 
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const newPerson = {
        name: body.name,
        number: body.number,
        date: new Date().toString()
    }

    Person.findByIdAndUpdate(request.params.id, newPerson, {new:true})
        .then(person => {
            response.json(person)})
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndRemove(id).then(person =>{
        response.status(204).end()
    }).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
        const infoString = `
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date().toString()}</p>`
        response.send(infoString)
    }).catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})