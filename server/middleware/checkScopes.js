const checkJWTScopes = require('express-jwt-authz')

module.exports = {
  canReadOrders: checkJWTScopes([ 'read:orders' ], { customScopeKey: 'scope' }),
  canCreateOrders: checkJWTScopes([ 'create:orders' ], { customScopeKey: 'scope' }),
  hasUserScopes: checkJWTScopes([ 'openid', 'email', 'profile' ], { customScopeKey: 'scope' })
}