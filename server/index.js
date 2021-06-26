const express = require('express')
const morgan = require('morgan')
const serveStatic = require('serve-static')
const cors = require('cors')
const helmet = require('helmet')
const { join } = require('path')

// middlewares
const checkJWT = require('./middleware/checkJWT')
const enforceHTTPS = require('./middleware/enforceHTTPS')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(enforceHTTPS)
app.use(serveStatic(join(__dirname, '../dist')))

app.use('/api/external', checkJWT, require('./routes/external'))
app.use('/api/v1/pizza', checkJWT, require('./routes/pizza'))

if (process.env.NODE_ENV === 'production') {
  app.use((_, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
}

module.exports = app
