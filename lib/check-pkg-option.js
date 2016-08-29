'use strict';

const path = require('path');
const pkg = require(path.join(process.env.PWD, 'package.json'));

module.exports = function(name) {
  if (pkg.hexoExtendFeature && pkg.hexoExtendFeature[name]) {
    switch (Object.prototype.toString.call(pkg.hexoExtendFeature[name]).slice(8, -1).toLowerCase()) {
      case 'array':
        if (typeof pkg.hexoExtendFeature[name][0] === 'string' &&
            ['on', 'off'].indexOf(pkg.hexoExtendFeature[name][0]) > -1) {
          return {
            value: pkg.hexoExtendFeature[name][0] === 'on',
            desc: pkg.hexoExtendFeature[name][1]
          };
        } else {
          return {
            value: pkg.hexoExtendFeature[name][0],
            desc: pkg.hexoExtendFeature[name][1]
          };
        }
      case 'string':
        return {
          value: pkg.hexoExtendFeature[name],
          desc: ''
        };
      case 'object':
        return {
          value: pkg.hexoExtendFeature[name],
          desc: ''
        };
      case 'boolean':
        return {
          value: pkg.hexoExtendFeature[name],
          desc: ''
        };
    }
  } else {
    return {
      value: null,
      desc: ''
    };
  }
};
