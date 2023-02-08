require('dotenv').config()
const express = require('express')
const moment = require('moment')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    if (tokens.method(req, res) === 'POST') {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
    }
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const Person = require('./models/person')

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/info', (request, response) => {
    Person.count({}).then(count => {
        const message = `Phonebook has info for ${count} people.<br/>${moment().format('YYYY-MM-DD hh:mm:ss')}`
        response.send(message)
    })
})

app.put('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        const body = request.body 

        if (body.number === undefined) {
            return response.status(400).json({ error: 'number missing' })
        } else if (body.name == undefined) {
            return response.status(400).json({ error: 'name missing' })
        }

        person.name = body.name
        person.number = body.number

        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findOneAndRemove(request.params.id).then(person => {
        response.json(person)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    } else if (body.number == undefined) {
        return response.status(400).json({ error: 'number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    Person.findOne({name: person.name}).then(foundPerson => {
        if (foundPerson) {
            const message = `Person exists with name ${foundPerson.name}`
            response.json(message)
        } else {
            person.save().then(savedPerson => {
                response.json(savedPerson)
            })
        }
    })

})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
