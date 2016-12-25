'use strict';
/******************************/
/********** PACKAGES **********/
/******************************/
const router = require('express').Router();


/****************************/
/********** ROUTES **********/
/****************************/
// TODO review that this works
router.get('/Blog/resources/:name', (req, res) => {
  const fileName = req.params.name.replace('.min', '');
  req.log.info({
    status: 200,
    'fileName': fileName
  });
  res.sendFile('docs/resources/' + fileName, {'root': __dirname + '/../../../'});
});

/**
 * Render the index template page
 * TODO why does the IoT project does not need this
 */
router.get('/', (req, res) => {
  res.sendFile('docs/index.html', {'root': __dirname + '/../../../'});
});


/*****************************/
/********** EXPORTS **********/
/*****************************/
module.exports = router;
