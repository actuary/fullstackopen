const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const logger = require('./utils/logger')
const config = require('./utils/config')

const blogRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app