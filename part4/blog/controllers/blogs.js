const Blog = require('../models/blog')

const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if (request.body.title === undefined) {
    return response.status(400).send("Error! No title.")
  }

  if (request.body.url === undefined) {
    return response.status(400).send("Error! No URL.")
  }

  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response, next) => {
  const {title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {title, author, url, likes},
    { new: true, runValidators: true, context: 'query' }
  )
  response.status(204).json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  Blog
    .findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(() => response.status(404).end())
})

module.exports = blogRouter