'use strict';

const path = require('path');
const pkg = require(path.join(process.env.PWD, 'package.json'));

/**
 * 获取对象类型
 *
 * @param {*} obj
 * @returns {string}
 */
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

module.exports = function(name) {
  if (pkg.hexoExtendFeature && pkg.hexoExtendFeature[name]) {
    switch (getType(pkg.hexoExtendFeature[name])) {
      case 'array':
        // ["on", "desc"]
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
      default:
        return {
          value: pkg.hexoExtendFeature[name],
          desc: null
        };
    }
  } else {
    return {
      value: null,
      desc: null
    };
  }
};
