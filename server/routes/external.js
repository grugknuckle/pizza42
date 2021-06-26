const router = require('express').Router()
const { getExternalAPI } = require('./../controllers/external')
// middlewares
const checkJWT = require('./../middleware/checkJWT')

module.exports = router

router.route('/')
  .all(checkJWT)
  .get(getExternalAPI)
