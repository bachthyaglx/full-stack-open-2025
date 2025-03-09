const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]

const url =
  `mongodb+srv://bachthyaglx:${password}@thy.0rbmxxb.mongodb.net/person?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(password && name && phone) {
    const person = new Person({
        name: name,
        number: phone,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${phone} to phonebook`)
        mongoose.connection.close()
      })
} else if(!name && !phone) {
    Person.find({}).then(result => {
        console.log(`phonebook:`)
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
