'use strict'

require('rootpath')()

let redis = require('config/redis')
let mongo = require('config/mongo')
let User = require('apps/models/user')

exports.getMainpage = (req, res) => {

  let redis_return = new Promise(function(resolve, reject) {
    let profile = JSON.stringify({
          'name': 'Krissada',
          'surname': 'Boontrigratn'
        })
    redis.set("profile", profile, function(err, response) {
      console.log("Redis: profile has been created.")
      resolve(response)
    })
  });

  redis_return.then(function(value) {
    redis.get("profile", function(err, profile) {
      console.log("Redis: profile has been received.")
      profile = JSON.parse(profile)
      res.render('index', { 'profile': profile })
    })
  })
}

exports.postMainpage = (req, res) => {
  res.send('Posted')
}

exports.getUser = (req, res) => {

  let user_id = req.params.user_id
  let users = User.getById(user_id, function(users, error){
    if(error) {
      res.status(500).json(error)
    } else {
      res.status(200).json(users)
    }
  })

}

exports.getUserList = (req, res) => {

  let users = User.find({}, function(users, error){
    if(error) {
      res.status(500).json(error)
    } else {
      res.status(200).json(users)
    }
  })

}

exports.getAddUser = (req, res) => {
  res.render('add-user')
}

exports.postAddUser = (req, res) => {

  var new_user = User({
    username: req.body.username,
    given_name: req.body.given_name,
    family_name: req.body.family_name,
    nickname: req.body.nickname
  })

  new_user.save(function(error){
    if(error) {
      throw new Error(error)
      res.status(500).json(error)
    } else {
      res.status(201).json(new_user)
    }
  })
}

/**
 * 404 page notfound
 */
exports.notfound = (req, res) => {
  res.render('404')
}