const router = require('express').Router()
const controller = require('./../controllers/pizza')

// middlewares
const checkJWT = require('./../middleware/checkJWT')
const { canReadOrders, canCreateOrders } = require('./../middleware/checkScopes')

module.exports = router

router.route('/orders')
  .all(checkJWT)
  .get(canReadOrders, controller.listOrders) // canReadOrders
  .post(canCreateOrders, controller.createOrder) // canCreateOrders
