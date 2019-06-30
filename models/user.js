const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true }).then((result) => {
    console.log('Connected to mongodb database ')
}).catch(err => {
    console.log('Error connecting to mongodb database')
})

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

userSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('User', userSchema)