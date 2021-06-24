if (process.env.NODE_ENV !== `production`) {
  console.log(`loading environment variables from ${process.env.NODE_ENV} environment`)
  require('dotenv').config()
}

module.exports = {
  clientId: process.env.VUE_APP_AUTH0_CLIENTID,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  domain: process.env.VUE_APP_AUTH0_DOMAIN
}