
module.exports = {
  getExternalAPI
}

async function getExternalAPI(req, res) {
  const data = {
    msg: 'Your access token was successfully validated!'
  }
  res.status(200).send(data)
}