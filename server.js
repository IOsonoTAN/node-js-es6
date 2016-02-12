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
 * app.disable: disable a something
 */
app.disable('x-powered-by')

/**
 * app.engine: using handlebars to be template engine
 */
var hbs = require('express-handlebars').create({
  'defaultLayout': 'master',
  'extname'      : '.hbs',
  // 'helpers'      : require('./config/handlebars-helpers'),
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
  console.log('stylus is compiling')
  return stylus(str)
         .set('filename', path)
         .use(nib())
}

app.use(
  // xmlParser(),
  useragent.express(),
  stylus.middleware({
    src: __dirname + '/apps/resources/css',
    dest: __dirname + '/public/css',
    compile: compile,
  }),
  express.static(__dirname + '/public'),
  bodyParser.urlencoded({ 'extended': true }),
  bodyParser.json({ 'type': 'application/json' }),
  middlewares,
  routes
)

http.createServer(app).listen(app.get('port'), function(){
  console.log(colors.green(`application is start: ${config.host.self}`))
})