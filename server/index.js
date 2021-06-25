

const express = require('express')
const morgan = require('morgan')
const serveStatic = require('serve-static')
const cors = require('cors')
const helmet = require('helmet')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const { join } = require('path')

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

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`
  }),
  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ['RS256']
})

app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your access token was successfully validated!'
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use((_, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
}

module.exports = app
