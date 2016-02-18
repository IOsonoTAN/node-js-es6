'use strict'

const config = require('../config/app'),
      passport = require('passport'),
      googleStrategy = require('passport-google-oauth20').Strategy

passport.use(new googleStrategy({
  clientID: config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL: `${config.host.self}/auth/google/callback`
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