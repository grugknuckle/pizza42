const axios = require('axios')
const ManagementClient = require('auth0').ManagementClient

const management = new ManagementClient({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.AUTH0_API_CLIENTID,
  clientSecret: process.env.AUTH0_API_SECRET,
  audience: process.env.AUTH0_API_AUDIENCE,
  scope: 'read:users update:users'
})

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
  // add timestamp to order
  const id = req.user.sub
  const timestamp = (new Date()).getTime()
  const order = Object.assign(req.body, { timestamp })
  
  try {
    let metadata = await management.getUser({ id }).then(user => user.metadata || {})
    let orders = metadata.orders ?? []
    orders.push(order)
    metadata.orders = orders
    const update = await management.updateUserMetadata({ id }, metadata)
    res.status(201).json({ message: 'Order received.', order, update })
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}`, stack: error.stack ?? [] }) 
  }
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

