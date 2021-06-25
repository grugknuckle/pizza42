const router = require('express').Router()
// const checkJWTScopes = require('express-jwt-authz')
// const options = {
//   customScopeKey: 'permissions'
// }

var database = {
  orders: {}
} // a fake database

module.exports = router

router.route('/orders/:id')
  .get((req, res, next) => {
    // get an existing order by id and customer
    const order = database.orders[req.params.id]
    const status = order ? 404 : 200
    const data = status == 200 ? order : {
      message: `order ${req.params.id} not found`
    }
    res.status(status).json(data)
  })
  .put((req, res, next) => {
    // update an existing order
    const order = database.orders[req.params.id]
    if (!order) {
      const data = {
        message: `order ${req.params.id} not found`
      }
      return res.status(404).json(data)
    }
    
    database.orders[req.params.id] = req.body
    res.status(200).json(req.body)
  })
  .delete((req, res, next) => {
    // cancel an existing order
  
  })

router.route('/orders')
// .all(checkJWTScopes([ 'read:quotes' ], options))
  .all((req, res, next) => {
    // make sure email is verified
  })
  .get((req, res, next) => {
    // get list of orders for this customer

  })
  .put((req, res, next) => {
    // create a new order for this customer

  })
