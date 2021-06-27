const checkJWTScopes = require('express-jwt-authz')

module.exports = {
  canReadOrders: checkJWTScopes([ 'read:orders' ], { customScopeKey: 'permissions' }),
  canCreateOrders: checkJWTScopes([ 'create:orders' ], { customScopeKey: 'permissions' }),
  hasUserScopes: checkJWTScopes([ 'openid', 'email', 'profile' ], { customScopeKey: 'scopes' })
}