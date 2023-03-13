const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (_, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const foundNote = await Note.findById(request.params.id)
  if (foundNote) {
    response.json(foundNote)
  } else {
    response.status(404).end()
  }

})

notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body

  const updatedNote = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedNote)
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)

})

notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter