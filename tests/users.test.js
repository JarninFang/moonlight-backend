const User = require('../models/user')
const supertest = require('supertest')
const testHelper = require('./test_helper')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const user = new User({ username: "username", email: "email@email.com" })
		await user.save()
	})

	test('creation succeeds with fresh username', async () => {
		const user = { username: "user1", password: "password", email: "user1@email.com" }
		const usersAtStart = await testHelper.usersInDb()
		await api
			.post('/api/users')
			.send(user)
			.expect(200)
			.expect('Content-Type', "application/json; charset=utf-8")

		const usersAtEnd = await testHelper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length+1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(user.username)
	})

	test('creation fails with nonunique username', async () => {
		const user = { username: "username", password: "password", email: "user1@email.com" }
		const usersAtStart = await testHelper.usersInDb()
		console.log(user)
		console.log(usersAtStart)
		const result = await api
			.post('/api/users')
			.send(user)
			.expect(500)
			//.expect('Content-Type', 'application/json; charset=utf-8')

		//expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await testHelper.usersInDb()
		expect(usersAtEnd.length).toBe(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})