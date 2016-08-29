'use strict';

module.exports = function(moduleName) {
  return {
    log: console.log.bind(console, moduleName),
    error: console.error.bind(console, moduleName)
  };
};
