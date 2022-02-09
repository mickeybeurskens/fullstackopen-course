const mongoose = require('mongoose')


if (process.argv.length < 3) {
    console.log('Please provide a password as argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const dataBaseName = 'persons-app'
const url =
    `mongodb+srv://fullstackmongo:${password}@cluster0.saorm.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    date: Date,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 4) {
    console.log(`Please provide a name and number to add: node mongo.js <name> <number>`)
    mongoose.connection.close()
}

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date().toString(),
    id: 1
})

person.save().then(result => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
})
