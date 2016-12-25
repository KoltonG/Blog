'use strict';
/******************************/
/********** PACKAGES **********/
/******************************/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


/************************************/
/********** CONFIGURATIONS **********/
/************************************/
// Disabling for security purposes
app.disable('x-powered-by');

// Set & Use
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


/********************************/
/********** MIDDLEWARE **********/
/********************************/
// Middleware for all files
app.use(require(__dirname + '/app/server/middlewares/logger.js'));


/****************************/
/********** ROUTES **********/
/****************************/
app.use(require('./app/server/controllers/'));


/************************************/
/********** STATICS ROUTES **********/
/************************************/
app.use('/Blog', express.static(__dirname + '/docs'));


/**********************************/
/********** START SERVER **********/
/**********************************/
const env = process.env.NODE_ENV || 'DEVELOP';
app.listen(process.env.PORT);
console.log('Blog \nENVIRONMENT: ' + env +
  '\nListening On Port ' + process.env.PORT);
