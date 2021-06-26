const checkJWTScopes = require('express-jwt-authz')

const options = {}
// const options = {
//   customScopeKey: 'permissions'
// }

module.exports = {
  canReadOrders: checkJWTScopes([ 'read:orders' ], options),
  canCreateOrders: checkJWTScopes([ 'create:orders' ], options)
}