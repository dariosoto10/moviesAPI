const chalk = new require('chalk')
const express = require('express')

const app = express()

const { config } = require('./config/index')
const moviesApi = require('./routes/movies')

const { logErrors, wrapErrors ,errorHandler } = require('./utils/middlewares/errorHandlers')
const notFoundHandler = require('./utils/middlewares/notFoundHandler')

app.use(express.json())

moviesApi(app)

app.use(notFoundHandler)

app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(
    `${chalk.green.bold('✔ [SERVER]')} Server running at the port: ${
      config.port
    }`
  )
})
