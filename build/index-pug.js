'use strict';
// FIXME: should replace this with all gulp task
/******************************/
/********** PACKAGES **********/
/******************************/
const fs = require('fs');
const pug = require('pug');


/*********************************/
/********** BUILD INDEX **********/
/*********************************/
fs.writeFile(__dirname + '/../docs/index.html', pug.renderFile(__dirname + '/../app/client/views/index.pug'));
