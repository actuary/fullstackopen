const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1 })
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(request.user)

  if (request.body.title === undefined) {
    return response.status(400).send('Error! No title.')
  }

  if (request.body.url === undefined) {
    return response.status(400).send('Error! No URL.')
  }

  const blog = new Blog({ ...request.body, user: user.id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  await savedBlog.populate('user', { 'username': 1, 'name': 1 })

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const { user, title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { user, title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )
  response.status(204).json(updatedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'Not found' })
  }

  if (blog.user.toString() !== request.user.toString()) {
    return response.status(400).json({ error: 'unauthorized' })
  }

  blog.remove()
    .then(() => response.status(204).end())
    .catch(() => response.status(404).end())
})

module.exports = blogRouter