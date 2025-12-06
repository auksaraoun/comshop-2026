import express from 'express'
import apiRouter from './routes/api.js'

const app = express()
const port = 3000

app.use(express.json())

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})