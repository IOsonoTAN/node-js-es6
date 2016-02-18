'use strict'

let config, env, port

env = process.env.NODE_ENV || 'development'
process.env.NODE_ENV = env

config = {
  'default': {
    'site_name': 'Node.JS Basic'
  },
  'production': {
    'session_secret': 'app-on-production',
    'host': {
      'port': 3000,
      'self': process.env.SELF_URL || 'http://localhost.com/'
    },
    'redis': {
      'port': 6379,
      'url': process.env.REDISTOGO_URL || process.env.REDIS_URL || 'redis://:@localhost:6379',
      'channel': 3
    },
    'mongodb': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nodejs',
    'googleAuth' : {
      'clientID': '599654107739.apps.googleusercontent.com',
      'clientSecret': 'AgWn906CtjuIZehL1aQuUE-t'
    }
  },
  'development': {
    'session_secret': 'app-dev',
    'host': {
      'port': 3000,
      'self': 'http://localhost:3000' || (`http://localhost:${process.env.PORT}`)
    },
    'redis': {
      'port': 6379,
      'url': process.env.REDISTOGO_URL || process.env.REDIS_URL || 'redis://:@localhost:6379',
      'channel': 3
    },
    'mongodb': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nodejs',
    'googleAuth' : {
      'clientID': '599654107739.apps.googleusercontent.com',
      'clientSecret': 'AgWn906CtjuIZehL1aQuUE-t'
    }
  }
}
module.exports = Object.assign(config['default'], config[env])