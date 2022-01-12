const express = require('express')
require('dotenv').config()
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/', require('./src/routes'))

const PORT = process.env.PORT || 3000

async function start() {
    try {
        app.listen(PORT, () => console.log(`App has benn started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start().then()

module.exports = app