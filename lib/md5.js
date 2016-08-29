'use strict';

const debug = require('./log')('[hexo-extend-plugin@md5]');

const fs = require('fs');
const crypto = require('crypto');

module.exports = function(path, verbose) {
  return new Promise(function(resolve, reject) {
    let md5sum = crypto.createHash('md5');
    let stream = fs.createReadStream(path);

    let start = verbose ? new Date().getTime() : null;

    stream.on('data', function(chunk) {
      md5sum.update(chunk);
    });

    stream.on('end', function() {
      let result = md5sum.digest('hex').toUpperCase();
      if (verbose) {
        debug.log(`File: ${path}\nMD5: ${result}\nCost:${(new Date().getTime() - start) / 1000}s`);
      }
      resolve(result);
    });

    stream.on('error', function(err) {
      reject(err);
    });
  });
};