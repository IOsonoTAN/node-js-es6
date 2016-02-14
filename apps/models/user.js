'use strict'

let mongoose = require('mongoose')
import { Schema } from 'mongoose'

let userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  given_name: {
    type: String,
    required: true,
    'default': 'Given'
  },
  family_name: {
    type: String,
    required: true,
    'default': 'Family'
  },
  nickname: {
    type: String
  },
  status: {
    type: String,
    'default': 'inactive'
  },
  updated_at: {
    type: Date,
    'default': Date.now
  },
  created_at: {
    type: Date,
    'default': Date.now
  }
}, {
  versionKey: false
})

userSchema.statics.getById = function(id, callback) {
  return User.find({ '_id': id }, function(error, user_detail) {
    if (error) {
      return callback(error)
    } else {
      return callback(user_detail)
    }
  })
}

let User = mongoose.model('User', userSchema)

module.exports = User