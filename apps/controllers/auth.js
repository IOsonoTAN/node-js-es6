'use strict'

require('rootpath')()

const config = require('config/app')

exports.getProfile = (req, res) => {
  console.log('Domain ->', req.session.passport.user._json.domain)
  console.log('Profile ->', req.session.passport.user)
  res.send('getProfile')
}