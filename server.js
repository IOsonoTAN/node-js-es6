'use strict'

/**
 * requiring modules
 */
const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      express = require('express'),
      session = require('express-session'),
      app = express(),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      useragent = require('express-useragent'),
      colors = require('colors/safe'),
      stylus = require('stylus'),
      nib = require('nib'),
      moment = require('moment'),
      passport = require('passport'),
      
      /**
       * local requiring modules
       */
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
  'layoutsDir'   : './apps/views/layout',
  'partialsDir'  : './apps/views/partials'
})
app.engine('.hbs', hbs.engine);

/**
 * app.set: set config for using express.js
 */
app.set('views', './apps/views')
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
  cookieParser(),
  bodyParser.json({ 'type': 'application/json' }),
  bodyParser.urlencoded({ 'extended': true }),
  session({
    // genid: function(req) {
    //   return genuuid() // use UUIDs for session IDs
    // },
    secret: 'p@y$3uY',
    name: 'Paysbuy',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  }),
  passport.initialize(),
  passport.session(),
  middlewares,
  routes
)
app.use((req, res, next) => {
  res.locals.session = req.session
  return next()
})

http.createServer(app).listen(app.get('port'), function(){
  console.log(colors.green(`application is started: ${config.host.self}`))
})

module.exports = app