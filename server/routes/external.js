const router = require('express').Router()

module.exports = router

router.route('/')
  .get((req, res) => {
    const data = {
      msg: 'Your access token was successfully validated!'
    }
    res.status(200).send(data)
  })
