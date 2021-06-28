const axios = require('axios')
// Docs ... https://auth0.github.io/node-auth0/
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
    let metadata = await management.getUser({ id }).then(user => user.app_metadata || {})
    console.warn(metadata)
    // set the order history in app_metadata, namespaced by the pizza app url
    let namespacedata = metadata.pizza4242 ?? { roles: ['customer'], orders: [] }
    namespacedata.orders.push(order)
    metadata.pizza4242 = namespacedata

    // update the app_metadata
    const update = await management.updateAppMetadata({ id }, metadata)
    res.status(201).json({ message: 'Order received.', order, update })
  } catch (error) {
    res.status(error.status ?? 500).json({ message: `Error: ${error.message}`, stack: error.stack ?? [] }) 
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

