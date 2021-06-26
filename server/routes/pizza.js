const router = require('express').Router()
// const checkJWTScopes = require('express-jwt-authz')
// const options = {
//   customScopeKey: 'permissions'
// }

module.exports = router

router.route('/orders')
// .all(checkJWTScopes([ 'fetch:orders' ], options))
  .get((req, res, next) => {
    // get list of orders for this customer
    res.status(200).json({
      message: 'This should fetch a list of orders.'
    })
  })
  .post((req, res, next) => {
    // create a new order for this customer
    res.status(201).json({
      message: 'Order received.',
      order: req.body
    })
  })
