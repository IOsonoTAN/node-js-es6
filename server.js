'use strict'

/**
 * requiring modules
 */
const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      express = require('express'),
      app = express(),
      xmlParser = require('express-xml-bodyparser'),
      bodyParser = require('body-parser'),
      useragent = require('express-useragent'),
      colors = require('colors/safe'),
      moment = require('moment'),
      config = require('./config/app'),
      middlewares = require('./apps/middlewares/router'),
      helpers = require('./apps/helpers'),
      routes = require('./apps/routes')

/**
 * app.locals: passing variables to views
 */
app.locals = { /* JSON.stringify() */
  'config': config
}

/**
 * app.disable: disable a something
 */
app.disable('x-powered-by')

/**
 * app.set: set config for using express.js
 */
app.set('views', path.join(__dirname, 'apps/views'))
app.set('view engine', 'jade')
app.set('trust proxy', true)
app.set('port', process.env.PORT ? process.env.PORT : config.host.port)

/**
 * app.use: set modules to using in express.js
 */
app.use(
  xmlParser(),
  useragent.express(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json({ type: 'application/json' }),
  middlewares,
  routes
)
http.createServer(app).listen(app.get('port'), function(){
  console.log(colors.green(`application is start: ${config.host.self}`))
})