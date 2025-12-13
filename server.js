import { app, port, logger } from './app.js'

app.listen(port, () => {
  logger.info(`server started listening on port ${port}`)
})