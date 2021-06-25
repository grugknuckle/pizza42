if (process.env.NODE_ENV !== 'production') {
  console.warn('loading environment variables from .env file ')
  require('dotenv').config()
}

const app = require('./server')
const port = (process.env.NODE_ENV !== 'production') ? 3000 : 3001

app.listen(port, () => {
  console.warn(`Express server started in ${process.env.NODE_ENV} environment`)
  console.warn(`Server listening on port ${port}.`)
})