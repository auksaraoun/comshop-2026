import express from 'express'

// middleware

// router
import apiRouter from './routes/api.js'

const app = express()
const port = 3000

const default_middlwares = [
  express.json()
]

app.use(default_middlwares)

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})