'use strict'

require('rootpath')()

const config = require('config/app'),
      passport = require('passport'),
      googleStrategy = require('passport-google').Strategy

exports.getProfile = (req, res) => {
  console.log('Domain ->', req.session.passport.user._json.domain)
  console.log('Profile ->', req.session.passport.user)
  res.send('getProfile')
}

exports.getAuthGoogleCallback = (req, res) => {
  res.send('Logged')
}