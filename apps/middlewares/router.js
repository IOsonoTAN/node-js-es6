'use strict'

const router = require('express').Router(),
      path = require('path')

router.use(function (req, res, next) {
  /**
   * Hidden response when app request to get 'favicon.ico'
   */
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} )
    res.end(/* icon content here */)
  } else {
    var url = req.protocol + '://' + req.get('host');
    console.log(`URL: ${url}(${req.url})`)
    next()
  }
})

router.get('/', function (req, res, next) {
  console.log('This is a middleware then get homepage')
  next()
})

module.exports = router