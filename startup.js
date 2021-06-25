if (process.env.NODE_ENV !== `production`) {
  console.log(`loading environment variables from .env file `)
  require('dotenv').config()
}

const app = require("./server")
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Express server started in ${process.env.NODE_ENV} environment`)
  console.log(`Server listening on port ${port}.`)
})