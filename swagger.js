const swaggerAutogen = require('swagger-autogen')()
require('dotenv').config()

const doc = {
    info: {
        title: 'GSMArena',
        description: 'Parse GSMArena website then return data as JSON',
    },
    host: process.env.HOST_URL || 'localhost:3000',
    schemes: ['http']
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then()