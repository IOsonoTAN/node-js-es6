'use strict'

const colors = require('colors/safe')
const config = require('../config/app')

let redis = require('redis')
let redis_url = require('url').parse(config.redis.url)
let redis_password = redis_url.auth.split(':')[1]
redis = redis.createClient(redis_url.port, redis_url.hostname)
redis.select(config.redis.channel)
redis.on('error', function(error) {
  let RedisStore;
  if (error) {
    console.log(colors.red(error));
  } else {
    RedisStore = require('connect-redis')(express)
    app.use(express.session({
      'store'   : new RedisStore({
        'host'  : redis_url.hostname,
        'port'  : redis_url.port,
        'prefix': "chs-sess",
        'pass'  : redis_password
      }),
      'secret'  : config.session_secret
    }))
  }
})

module.exports = redis