'use strict'

const express = require('express'),
      app = express(),
      xmlParser = require('express-xml-bodyparser'),
      bodyParser = require('body-parser'),
      useragent = require('express-useragent'),
      http = require('http'),
      fs = require('fs'),
      colors = require('colors/safe'),
      routes = require('./apps/routes')

app.disable('x-powered-by')
app.set('trust proxy', true)
app.set('port', process.env.PORT ? process.env.PORT : 3000)
app.use(
  xmlParser(),
  useragent.express(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json({ type: 'application/json' }),
  routes
)

http.createServer(app).listen(app.get('port'), function(){
  console.log(colors.green(`App start: http://localhost:${app.get('port')}`));
})