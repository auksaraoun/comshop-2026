import express from 'express'

// libs
import logger from './libs/logger.js'

// middleware

// router
import apiRouter from './routes/api.js'

const app = express()
const port = 3000

const default_middlwares = [
    express.json()
]

console.log('test');

app.use(default_middlwares)

app.use('/api', apiRouter);

export { app, port, logger }