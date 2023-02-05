const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.qhxmxaw.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
name: String,
number: String,
})
const Person = mongoose.model('Note', personSchema)

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

if (process.argv.length == 3) {
    showPeople()
} else if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    createPerson(name, number)
} else {
    console.log("Invalid command!")
}