const express = require('express')
const morgan = require('morgan')
const serveStatic = require('serve-static')
const cors = require('cors')
const helmet = require('helmet')
const { join } = require('path')

// middlewares
const enforceHTTPS = require('./middleware/enforceHTTPS')

const app = express()
const ENVIRON = process.env.NODE_ENV

if(ENVIRON === 'production') {
  app.use(enforceHTTPS)
}

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(serveStatic(join(__dirname, '../dist')))

app.use('/api/external', require('./routes/external'))
app.use('/api/v1/pizza', require('./routes/pizza'))

if (ENVIRON === 'production') {
  app.use((_, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
}

module.exports = app
