function enforceHTTPS(req, res, next) {
  var schema = req.headers['x-forwarded-proto']
  if (schema === 'https') {
    // Already https; don't do anything special.
    next()
  }
  else {
    // Redirect to https.
    res.redirect('https://' + req.headers.host + req.url)
  }
}

module.exports = enforceHTTPS