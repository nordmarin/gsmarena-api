const express = require('express')
require('dotenv').config()
const app = express()

app.use('/api/', require('./routes/routes'))

const PORT = process.env.port || 5000

async function start() {
    try {
        app.listen(PORT, () => console.log(`App has benn started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

module.exports = app