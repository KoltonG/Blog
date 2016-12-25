'use strict';
// FIXME change this to Grunt Tasks
/******************************/
/********** PACKAGES **********/
/******************************/
const fs = require('fs');
const sass = require('node-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');


/********************************/
/********** VARIABLES  **********/
/********************************/
// Sass Config
let configSass = {
  file: __dirname + '/../app/client/stylesheets/main.scss',
  sourceComments: true,
  outputStyle: 'expanded'
};

// CSS Prefixer
const prefixer = postcss([autoprefixer({
  remove: false,
  browsers: [
    'ie >= 10',
    '> 5%',
  ]
})]);


/********************************/
/********** BUILD SCSS **********/
/********************************/
sass.render(configSass, function(error, result) {
  if (!error) { // No Error, run throught autoprefixer and write to disk
    prefixer.process(result.css).then(function(result2) {
      fs.writeFile(__dirname + '/../docs/resources/main.css', result2.css);
    });
  } else {
    console.log(error);
  }
});

configSass.sourceComments = false;
configSass.outputStyle = 'compressed';

sass.render(configSass, function(error, result) {
  if (!error) { // No Error, run throught autoprefixer and write to disk
    prefixer.process(result.css).then(function(result2) {
      fs.writeFile(__dirname + '/../docs/resources/main.min.css', result2.css);
    });
  } else {
    console.log(error);
  }
});
