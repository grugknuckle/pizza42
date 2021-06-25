const express = require('express')
const morgan = require('morgan')
const serveStatic = require('serve-static')
const cors = require('cors')
const helmet = require('helmet')
const { join } = require('path')
const checkJWT = require('./middleware/checkJWT')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(serveStatic(join(__dirname, '../dist')))

const domain = process.env.VUE_APP_AUTH0_DOMAIN
const audience = process.env.VUE_APP_AUTH0_AUDIENCE

if (!domain || !audience) {
  throw 'The environment variables are not set properly !'
}

// app.get('/api/external', checkJWT, (req, res) => {
//   res.send({
//     msg: 'Your access token was successfully validated!'
//   })
// })

app.use('/api/external', checkJWT, require('./routes/external'))

if (process.env.NODE_ENV === 'production') {
  app.use((_, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
}

module.exports = app
