'use strict'

/**
 * requiring modules
 */
const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      useragent = require('express-useragent'),
      colors = require('colors/safe'),
      stylus = require('stylus'),
      nib = require('nib'),
      moment = require('moment'),
      config = require('./config/app'),
      middlewares = require('./apps/middlewares/router'),
      helpers = require('./apps/helpers'),
      routes = require('./apps/routes')

/**
 * app.locals: passing variables to views
 */
app.locals = {
  'config': config
}

/**
 * app.disable: disable something
 */
app.disable('x-powered-by')

/**
 * app.engine: using handlebars to be template engine
 * -- 'helpers': require('./config/handlebars-helpers')
 */
var hbs = require('express-handlebars').create({
  'defaultLayout': 'master',
  'extname'      : '.hbs',
  'layoutsDir'   : __dirname + '/apps/views/layout',
  'partialsDir'  : __dirname + '/apps/views/partials'
})
app.engine('.hbs', hbs.engine);

/**
 * app.set: set config for using express.js
 */
app.set('views', path.join(__dirname, 'apps/views'))
app.set('view engine', '.hbs')
app.set('trust proxy', true)
app.set('port', process.env.PORT ? process.env.PORT : config.host.port)

/**
 * app.use: set modules to using in express.js
 */
let compile = function(str, path) {
  console.log('stylus compiled')
  return stylus(str)
         .set('filename', path)
         .use(nib())
}

app.use(
  useragent.express(),
  stylus.middleware({
    src: './apps/resources/css',
    dest: './public/css',
    compile: compile,
  }),
  express.static('./public'),
  bodyParser.json({ 'type': 'application/json' }),
  bodyParser.urlencoded({ 'extended': true }),
  middlewares,
  routes
)

http.createServer(app).listen(app.get('port'), function(){
  console.log(colors.green(`application is started: ${config.host.self}`))
})