const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

require('dotenv').config()

const User = require('./models/user')

const passport = require('passport-local')

const PORT = process.env.PORT

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Moonlight backend')
})

app.post('/api/register', (req, res) => {
    const body = req.body
    console.log(req.body)
    if(!body.username || !body.email || !body.password) {
        return res.status(400).send();
    }

    const newUser = new User({
        username: body.username,
        email: body.email,
        password: body.password
    })
    console.log(body)
    newUser.save().then(result => {
        res.send(result.toJSON())
        //res.status(200).send()
    }).catch(err => {
        console.log(err)
        res.status(400).send()
    })
})

app.post('/api/login', (req, res) => {
    const body = req.body
    User.findOne({username: body.username}).then(result => {
        if(result.password == body.password) {
            res.status(200).send({'result': 'User successfully validated'})
        }
    }).catch(err => {
        res.status(401).send({'result': 'User credentials incorrect'})
    })
})
app.listen(PORT, () => {
    console.log('Server listening on port ', PORT)
})