import { MONGODB_URI } from './utils/config'
import express from 'express'
const app = express()

import cors from 'cors'
import notesRouter from './controllers/notes'
import middleware from './utils/middleware'
import { set, connect } from 'mongoose'

set('strictQuery', false)

console.log('connecting to', MONGODB_URI)

connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)