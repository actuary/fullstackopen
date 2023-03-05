
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const re = /^(\d+-){1,2}\d+$/
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    validate: {
      validator: async value => {
        const person = await Person.findOne({ name: value })
        return !(!!person)
      }
    }
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: value => re.test(value),
      message: "Number must be at least 8 characters long with 1-2 hypen separators"
    }
  },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
