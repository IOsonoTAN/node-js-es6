'use strict'

const colors = require('colors/safe')
const fs = require('fs')
let config = require('../config/app')

let mongoose = require('mongoose')
let mongo = mongoose.connect(config.mongodb)

mongoose.connection.on('error', function(error) {
  console.log(colors.red(error))
})

/**
 * Load database schemas
 */
let models = fs.readdirSync('./apps/models/')
models.forEach(function (file) {
  if(file.search(/\.js/) > -1){
    require('../apps/models/' + file)
  }
})

module.exports = mongoose