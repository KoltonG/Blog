'use strict';
/******************************/
/********** PACKAGES **********/
/******************************/
const bunyan = require('bunyan');
let log = null;

log = bunyan.createLogger({
  name: "Blog",
  port: process.env.PORT,
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  }
});


/***************************/
/********** LOGER **********/
/***************************/
module.exports = function(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.log = log.child({
    ip: ip,
    endpoint: req.url.substring(0, 140)
  });
  next();
};
