
module.exports = {
  createOrder,
  listOrders
}


/**
 * Handles creating a new Pizza order and writing it back the the Auth0 user database as meta data.
 * 
 * @param {Object} req The Express.js request object
 * @param {Object} res The Express.js response object
 * @param {Function} next The Express.js 'next' function
 */
async function createOrder(req, res, next) {
  // create a new order for this customer
  res.status(201).json({
    message: 'Order received.',
    order: req.body
  })
}

/**
 * Gets a list of past orders that the user has entered.
 * 
 * @param {Object} req The Express.js request object
 * @param {Object} res The Express.js response object
 * @param {Function} next The Express.js 'next' function
 */
async function listOrders(req, res, next) {
  // get list of orders for this customer
  res.status(200).json({
    message: 'This should fetch a list of orders.'
  })
}