
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

const personSchema = new mongoose.Schema({
name: String,
number: String,
})


const createPerson = (name, number) => {
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
      console.log(`person ${name}@${number} saved!`)
      mongoose.connection.close()
    })
}

const showPeople = () => {
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person)
        })
        mongoose.connection.close()
    })
}

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
