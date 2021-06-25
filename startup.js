const mode = process.argv[2]
/**
 * HEROKU BEST PRACTICES
 * https://devcenter.heroku.com/articles/node-best-practices
 */

switch(mode) {
  case 'dev':
    require('dotenv').config()
    process.env.PORT = 3001
    process.env.NODE_ENV = 'development'
    console.warn('Config loaded from local .env')
    break
  case 'local':
    require('dotenv').config()
    process.env.PORT = 3000
    process.env.NODE_ENV = 'local'
    console.warn('Config loaded from local .env')
    break
  default:
    // load from Heroku config vars
}


const app = require('./server')
const port = process.env.PORT

app.listen(port, () => {
  console.warn(`Express server started in ${process.env.NODE_ENV} environment`)
  console.warn(`Server listening on port ${port}.`)
})