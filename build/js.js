'use strict';
// FIXME change this to Gulp Task
/******************************/
/********** PACKAGES **********/
/******************************/
const fs = require('fs');
const globAll = require('glob-all');
const UglifyJS = require("uglify-js");
const concat = require('concat-files');


/******************************/
/********** BUILD JS **********/
/******************************/
const files = globAll.sync([
  __dirname + '/../app/client/javascripts/vendors/angular.js',
  __dirname + '/../app/client/javascripts/vendors/*.js',
  __dirname + '/../app/client/javascripts/app.js',
  __dirname + '/../app/client/javascripts/**/*.js',
]);

var result = UglifyJS.minify(files, {
  mangle: false
});

fs.writeFile(__dirname + '/../docs/resources/main.min.js', result.code);

concat(files, __dirname + '/../docs/resources/main.js');
