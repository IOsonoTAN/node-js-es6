'use strict'

const config = require('../config/app'),
      passport = require('passport'),
      googleStrategy = require('passport-google-oauth20').Strategy,
      facebookStrategy = require('passport-facebook').Strategy

passport.use(new googleStrategy({
  clientID: config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL: `${config.host.self}/auth/google/callback`
}, function(token, refreshToken, profile, done) {
  done('', profile)
}))

passport.use(new facebookStrategy({
  clientID: config.facebookAuth.clientID,
  clientSecret: config.facebookAuth.clientSecret,
  callbackURL: `${config.host.self}/auth/facebook/callback`,
  profileFields: ['id', 'picture', 'displayName', 'email', 'first_name', 'last_name', 'verified']
}, function(token, refreshToken, profile, done) {
  done('', profile)
}))

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

module.exports = passport