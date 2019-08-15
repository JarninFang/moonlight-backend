const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
	const users = await User.find({})
    res.json(users.map(user => user.toJSON()))
})

//Registering a user
usersRouter.post('/', async (req, res, next) => {
	try {
		const body = req.body
		if(!body.username || !body.email || !body.password) {
			return res.status(400).send()
		}
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(body.password, saltRounds)
		
		const newUser = new User({
			username: body.username,
			email: body.email,
			passwordHash,
		})
		const result = await newUser.save()
		res.send(result.toJSON())
	} catch(exception) {
		next(exception)
	}
})

usersRouter.post('/login', async (req, res, next) => {
	const body = req.body
	try {
		const result = await User.findOne({user: body.username})
		if(result.password == body.password) {
			res.status(200).send({'result': 'User successfully validated'})
		}
	} catch(exception) {
		res.status(401).send({'result': 'User credentials incorrect'})
	}
})

module.exports = usersRouter;