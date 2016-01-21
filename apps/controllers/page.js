'use strict'

let redis = require('../../config/redis')

exports.mainpage = (req, res) => {

  var redis_return = new Promise(function(resolve, reject) {
    var profile = JSON.stringify({
          'name': 'Krissada',
          'surname': 'Boontrigratn'
        })
    redis.set("profile", profile, function(err, response) {
      console.log("Profile has been created.")
      resolve(response)
    })
  });

  redis_return.then(function(value) {
    redis.get("profile", function(err, profile) {
      profile = JSON.parse(profile)
      res.render('index', { 'profile': profile })
    })
  })
}

/**
 * 404 page notfound
 */
exports.notfound = (req, res) => {
  res.render('404')
}