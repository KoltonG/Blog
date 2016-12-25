'use strict';
// FIXME change this to grunt taks
/******************************/
/********** PACKAGES **********/
/******************************/
const fs = require('fs');
const pug = require('pug');
const globAll = require('glob-all');


/************************************/
/********** BUILD PARTIALS **********/
/************************************/
/**
 * Creates and array of partial locations
 */
const partialsLocationList = globAll.sync([ 
  __dirname + '/../app/client/views/partials/*'
]);

/**
 * Iterate over the partials and compile them to HTML
 */
partialsLocationList.forEach(partialLocation => {
  // Format the final filename
  var partialFilename = partialLocation.split('/')[partialLocation.split('/').length - 1].replace('.pug', '.html');

  // Complile and save file
  fs.writeFile(__dirname + '/../docs/partials/' + partialFilename, pug.renderFile(partialLocation)); // Compile partial and set their destination
});
