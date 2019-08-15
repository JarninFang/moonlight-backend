const app = require('./app')
const http = require('http')
const PORT = require('./utils/config').PORT

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('Server listening on port ', PORT)
})